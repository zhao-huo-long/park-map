import { render } from 'preact'
import { App } from './app.tsx'
import './index.css'
import VConsole from 'vconsole';

const vConsole = new VConsole();
// or init with options
// const vConsole = new VConsole({ theme: 'dark' });

window.addEventListener('error', (e) => {
  alert(e)
})


render(<App />, document.getElementById('app') as HTMLElement)
