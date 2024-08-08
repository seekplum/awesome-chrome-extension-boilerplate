import './style.scss';

chrome.runtime.sendMessage({
    message: 'hello-from-content-script',
    description: 'hello background!',
});
console.log(`Current page's url must be prefixed with https://github.com`);
