import { EventNames, MessageModules } from '@/constants';
import type { ContentMessageData, InjectionMessageData } from '@/utils';

console.log('injected chrome extension data0');

function sendMessageToContent(eventName: EventNames, data: any): void {
    window.postMessage(
        {
            origin: location.origin,
            module: MessageModules.CONTENT,
            eventName,
            data,
        } as InjectionMessageData,

        'https://github.com/*/*/issues',
    );
}

(function (xhr) {
    const XHR = xhr.prototype;

    const oldOpen = XHR.open;
    const oldSend = XHR.send;
    const oldSetRequestHeader = XHR.setRequestHeader;

    XHR.open = function (method, url) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this._method = method;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this._url = url;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this._requestHeaders = {};
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return oldOpen.apply(this, arguments); // eslint-disable-line unicorn/prefer-reflect-apply, prefer-rest-params
    };

    XHR.setRequestHeader = function (header, value) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this._requestHeaders[header] = value;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return oldSetRequestHeader.apply(this, arguments); // eslint-disable-line unicorn/prefer-reflect-apply, prefer-rest-params
    };

    XHR.send = function (_) {
        this.addEventListener('load', function () {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if (!this._url) {
                return;
            }

            if (!(this.responseType !== 'blob' && this.responseText)) {
                return;
            }

            try {
                const data = {
                    host: window.location.host,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    method: this._method,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    url: this._url,
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    requestHeaders: this._requestHeaders,
                    response: this.responseText,
                };
                console.log('injected chrome extension data1:', data);
                sendMessageToContent(EventNames.XHR_RESPONSE, {
                    module: MessageModules.CONTENT,
                    data,
                } as ContentMessageData);
            } catch (error) {
                console.log('Error in responseType try catch');
                console.log(error);
            }
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return oldSend.apply(this, arguments); // eslint-disable-line unicorn/prefer-reflect-apply, prefer-rest-params
    };
})(XMLHttpRequest);

const originalFetch = window.fetch;

window.fetch = function (url, options) {
    const fch = originalFetch(url, options);

    fch.then((resp) => {
        if (resp && resp.ok && resp.status === 200) {
            return resp.clone().json();
        }
        return {};
    }).then((res) => {
        const data = {
            host: window.location.host,
            options,
            url,
            response: res,
        };
        console.log('injected chrome extension data2:', data);
    });
    return fch;
};
export default undefined;
