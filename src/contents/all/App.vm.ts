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
        setTimeout(() => {
            runInAction(() => {
                this.initialized = true;
            });
        }, 5 * 1000);
    };

    @observable
    initialized = false;

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

        this.config.isExpanded = !this.config.isExpanded;
        await Extension.setConfig({
            isExpanded: this.config.isExpanded,
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
