import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/App.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import configureStore, { history } from "./redux/store/defaultStore";

let store = configureStore();
export const routeAPI = "http://localhost:5000/pyxy-f84e8/us-central1/api/";
// export const routeAPI = "https://us-central1-pyxy-f84e8.cloudfunctions.net/api/";
// export const routeAPI = "https://api.pyxy.space/";

ReactDOM.render(
    <Provider store={store}>
        <App history={ history }/>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
