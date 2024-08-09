import { MessageModules } from '@/constants';
import type { ContentMessageData } from '@/utils';

// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(
    (
        request: ContentMessageData,
        sender: chrome.runtime.MessageSender,
        sendResponse: (response: any) => void,
    ) => {
        console.log('收到来自content-script的消息:', request, sender, sendResponse);
        if (request.module === MessageModules.POPUP && request.data.cmd === 'popup.advanced') {
            // ff: opens up about:addons with openOptionsPage
            if (/Firefox/.test(navigator.userAgent)) {
                chrome.management.getSelf((extension) => {
                    chrome.tabs.create({ url: extension.optionsUrl });
                });
            } else {
                chrome.runtime.openOptionsPage();
            }
        } else if (request.data.message === 'hello-from-content-script') {
            console.log('hello:', request.data.description);
        }
        sendResponse(`我是后台，我已收到你的消息: ${JSON.stringify(request)}`);
    },
);

console.log('This is background page!');

export default undefined;
