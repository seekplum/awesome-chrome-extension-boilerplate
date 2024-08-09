import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import { CRX_NAME, MessageModules } from '@/constants';
import type { ContentMessageData, InjectionMessageData } from '@/utils';

import App from './App';

import './style.scss';

console.log(`Current page's url must be prefixed with https://github.com`);

// 注意，必须设置了run_at=document_start 此段代码才会生效
sendMessageToBackground({
    module: MessageModules.BACKGROUND,
    data: {
        message: 'hello-from-content-script',
        description: 'hello background!',
    },
} as ContentMessageData);

// 注入自定义JS
injectCustomJs();
const container = document.createElement('div');
document.body.append(container);
const root = createRoot(container);
root.render(
    <HashRouter>
        <App />
    </HashRouter>,
);

function injectCustomJs() {
    console.log('inject custom js');
    const s = document.createElement('script');
    s.src = chrome.runtime.getURL('js/injected.js');
    // eslint-disable-next-line unicorn/prefer-add-event-listener
    s.onload = function () {
        s.remove();
    };
    document.body.append(s);
}

// 接收来自后台的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const tabName = sender.tab ? `content-script(${sender.tab.url})` : 'popup或者background';
    console.log(`收到来自 ${tabName} 的消息:`, request);
    if (request.cmd === 'update_font_size') {
        const ele = document.createElement('style');
        ele.innerHTML = `* {font-size: ${request.size}px !important;}`;
        document.head.append(ele);
    } else {
        sendResponse(`我收到你的消息了: ${JSON.stringify(request)}`);
    }
});

// 主动发送消息给后台
function sendMessageToBackground(message: ContentMessageData) {
    chrome.runtime.sendMessage(message, (response) => {
        console.log('收到来自后台的回复:', response);
    });
}

window.addEventListener(
    'message',
    (event: MessageEvent<InjectionMessageData>): void => {
        if (event.origin !== location.origin) {
            return;
        }

        if (event.data.origin !== CRX_NAME) {
            return;
        }

        if (event.data.module !== MessageModules.INJECT) {
            return;
        }
        console.log('收到消息:', event);
    },
    false,
);
