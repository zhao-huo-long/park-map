import { render } from 'preact'
import { App } from './app.tsx'
import './index.css'
// import VConsole from 'vconsole';

// const vConsole = new VConsole();
// or init with options
// const vConsole = new VConsole({ theme: 'dark' });

window.addEventListener('error', (e) => {
  alert(e)
})

// canvasSize.maxArea({
//   usePromise: true
// })
// .then(function(result) {
//   console.log('Success', result);
// })
// .catch(function(result) {
//   console.log('Error', result);
// });


render(<App />, document.getElementById('app') as HTMLElement)
