import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
// import * as serviceWorker from './serviceWorker';

import store from './state/store';

// Initialize client state
import { loadWeb3 } from './state/init/web3';
// import { initSockets } from './state/init/sockets';
// import { initContracts } from './state/init/contracts';
import { startTipTimer } from './state/init/timer';

import './css/nunito.css';
import './css/open-sans.css';
import './fonts/Rock_Salt/rock-salt.css';
import './fonts/Roboto_Mono/roboto-mono.css';

// load data
async function init() {
  // connect to server, get contract info
  // await initSockets();

  // load web3
  await loadWeb3();

  // connect contracts to web3
  // await initContracts();

  // wait 4 seconds for everything to load, then show a tip
  startTipTimer();
}
init();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,

  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
