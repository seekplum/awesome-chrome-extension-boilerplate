import { action, makeObservable, observable, runInAction } from 'mobx';

import { EXTENSION_CONFIG_NAME } from '@/constants';
import type { IExtensionConfig } from '@/typings';

import pkg from '../../package.json';

export const VERSION = pkg.version;

export const defaultExtensionConfig = {
    isExpanded: true,
} as IExtensionConfig;

export class Extension {
    static getConfig = async (): Promise<IExtensionConfig> => {
        const data = await chrome.storage.local.get(EXTENSION_CONFIG_NAME);
        if (!data || !data[EXTENSION_CONFIG_NAME]) {
            return defaultExtensionConfig;
        }
        return {
            ...defaultExtensionConfig,
            ...data[EXTENSION_CONFIG_NAME],
        };
    };

    static setConfig = async (record: Partial<IExtensionConfig>) => {
        const config = await Extension.getConfig();
        await chrome.storage.local.set({
            [EXTENSION_CONFIG_NAME]: {
                ...config,
                ...record,
            },
        });
    };

    @observable
    initialized = false;

    @observable
    config: IExtensionConfig | null = null;

    constructor() {
        makeObservable(this);
        this.init();
    }

    @action
    private init = async () => {
        const config = await Extension.getConfig();
        runInAction(() => {
            this.config = config;
            this.initialized = true;
        });
        chrome.storage.local.onChanged.addListener((changes) => {
            if (changes.extensionConfig) {
                runInAction(() => {
                    this.config = changes.extensionConfig.newValue;
                });
            }
        });
    };
}
