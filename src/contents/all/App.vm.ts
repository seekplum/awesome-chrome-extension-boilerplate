import { action, makeObservable, observable, runInAction } from 'mobx';

import { CRX_NAME, EventNames, MessageModules } from '@/constants';
import type { IExtensionConfig } from '@/typings';
import type { ContentMessageData, InjectionMessageData } from '@/utils';
import { Extension } from '@/utils';
import * as printer from '@/utils/printer';

class AppVM {
    constructor() {
        makeObservable(this);
        this.init();
    }

    @action
    init = () => {
        window.addEventListener('message', this.handleMessage);
        this.fetchConfig();
    };

    @observable
    config: IExtensionConfig | null = null;

    @action
    fetchConfig = async (): Promise<void> => {
        const config = await Extension.getConfig();
        runInAction(() => {
            this.config = config;
        });
    };

    @action
    toggleCollapsed = async () => {
        if (!this.config) {
            return;
        }

        this.config.isCollapsed = !this.config.isCollapsed;
        await Extension.setConfig({
            isCollapsed: this.config.isCollapsed,
        });
    };

    @action
    handleMessage = async (event: MessageEvent<InjectionMessageData<ContentMessageData>>) => {
        if (event.origin !== location.origin) {
            return;
        }

        const { data: eventData } = event;

        if (eventData.origin !== CRX_NAME) {
            return;
        }

        if (eventData.module !== MessageModules.INJECT) {
            return;
        }

        if (![EventNames.XHR_RESPONSE, EventNames.FETCH_RESPONSE].includes(eventData.eventName)) {
            return;
        }
        const { data: contentData } = eventData;
        const { data } = contentData;

        printer.consoleLog('收到消息:', data);
    };
}

export default AppVM;
