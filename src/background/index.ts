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
    } else if (message.message === 'hello-from-content-script') {
        console.log('hello:', message.description);
    }
});

console.log('This is background page!');

export default undefined;
