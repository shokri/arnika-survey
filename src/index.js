import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import * as serviceWorker from './serviceWorker.js';
import Routes from "./routes";
import store from "./redux/store"
import './index.css';
import './assets/css/style.scss';






ReactDOM.render(<Provider store={store}><Routes /></Provider>, document.getElementById('root'));


serviceWorker.register();