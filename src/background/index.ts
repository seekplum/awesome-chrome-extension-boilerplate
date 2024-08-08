import { onMessage } from 'webext-bridge';

onMessage('hello-from-content-script', (msg) => {
    console.log(msg);
});

chrome.runtime.onMessage.addListener((message) => {
    console.log('chrome.runtime.onMessage:', message);
    if (message.message === 'popup.advanced') {
        // ff: opens up about:addons with openOptionsPage
        if (/Firefox/.test(navigator.userAgent)) {
            chrome.management.getSelf((extension) => {
                chrome.tabs.create({ url: extension.optionsUrl });
            });
        } else {
            chrome.runtime.openOptionsPage();
        }
    }
});

console.log('This is background page!');
