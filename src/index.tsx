import { render } from 'solid-js/web';
import { App } from './components/app';
import './main.scss';

const loadContent = (parentEl: Element) => {
    render(() => <App />, parentEl);
};

const root = document.querySelector('#root');
if (root != null) {
    // eslint-disable-next-line no-console
    console.log(`APP Version: ${__VERSION__}`);
    loadContent(root);
}
