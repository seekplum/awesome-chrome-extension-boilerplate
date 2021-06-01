declare module 'speed-measure-webpack-plugin' {
    import { Configuration, Plugin } from 'webpack';

    interface SpeedMeasurePluginOptions {
        disable: boolean;
        outputFormat: 'json' | 'human' | 'humanVerbose' | ((outputObj: object) => void);
        outputTarget: string | ((outputObj: string) => void);
        pluginNames: object;
        granularLoaderData: boolean;
    }

    class SpeedMeasurePlugin extends Plugin {
        constructor(options?: Partial<SpeedMeasurePluginOptions>);
        wrap(webpackConfig: Configuration): Configuration;
    }

    export = SpeedMeasurePlugin;
}

declare module 'antd-dayjs-webpack-plugin' {
    import { Plugin } from 'webpack';

    class WebpackDayjsPlugin extends Plugin {
        apply(compiler: Compiler): void;
    }

    export = WebpackDayjsPlugin;
}

declare module 'ssestream' {
    import { Request } from 'express';
    import { Transform } from 'stream';

    class SSEStream extends Transform {
        constructor(req: Request);
    }

    export = SSEStream;
}

declare module '@soda/friendly-errors-webpack-plugin' {
    import { Plugin, Compiler } from 'webpack';

    declare class FriendlyErrorsWebpackPlugin extends Plugin {
        constructor(options?: FriendlyErrorsWebpackPlugin.Options);

        apply(compiler: Compiler): void;
    }

    declare namespace FriendlyErrorsWebpackPlugin {
        enum Severity {
            Error = 'error',
            Warning = 'warning',
        }

        interface Options {
            compilationSuccessInfo?: {
                messages: string[];
                notes: string[];
            };
            onErrors?(severity: Severity, errors: string): void;
            clearConsole?: boolean;
            additionalFormatters?: Array<(errors: WebpackError[], type: Severity) => string[]>;
            additionalTransformers?: Array<(error: any) => any>;
        }

        interface WebpackError {
            message: string;
            file: string;
            origin: string;
            name: string;
            severity: Severity;
            webpackError: any;
        }
    }

    export = FriendlyErrorsWebpackPlugin;
}