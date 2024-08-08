import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import App from './App';

import './style.scss';

chrome.runtime.sendMessage({
    message: 'hello-from-content-script',
    description: 'hello background!',
});
console.log(`Current page's url must be prefixed with https://github.com`);

const container = document.createElement('div');
document.body.append(container);
const root = createRoot(container);
root.render(
    <HashRouter>
        <App />
    </HashRouter>,
);
