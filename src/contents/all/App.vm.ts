import { action, makeObservable, observable } from 'mobx';

import { CRX_NAME, MessageModules } from '@/constants';
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
    initialized = false;

    @observable
    isCollapsed = false;

    @action
    fetchConfig = async (): Promise<void> => {
        const config = await Extension.getConfig();
        this.initialized = true;
        this.isCollapsed = config.isCollapsed;
    };

    @action
    handleMessage = async (
        event: MessageEvent<InjectionMessageData<ContentMessageData>>,
    ): Promise<void> => {
        if (event.origin !== location.origin) {
            return;
        }

        if (event.data.origin !== CRX_NAME) {
            return;
        }

        if (event.data.module !== MessageModules.INJECT) {
            return;
        }
        printer.consoleLog('收到消息:', event);
    };
}

export default AppVM;
