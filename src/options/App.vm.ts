import { action, makeObservable, observable, runInAction } from 'mobx';

import type { IExtensionConfig } from '@/typings';
import { Extension } from '@/utils';

class OptionsSettingsVM {
    constructor() {
        makeObservable(this);
        this.init();
    }

    @action
    init = () => {
        this.fetchConfig();
    };

    @observable
    initialized = false;

    @observable
    config: IExtensionConfig | null = null;

    @action
    fetchConfig = async (): Promise<void> => {
        const config = await Extension.getConfig();
        runInAction(() => {
            this.initialized = true;
            this.config = config;
        });
    };

    @action
    saveConfig = () => {
        if (!this.config) {
            return;
        }
        Extension.setConfig(this.config);
    };

    @action
    handleSubmit = (values: Record<string, any>): void => {
        if (!this.config || !values || Object.keys(values).length === 0) {
            return;
        }
        this.config = { ...this.config, ...values };
        this.saveConfig();
    };
}

export default OptionsSettingsVM;
