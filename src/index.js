/* eslint no-unused-vars: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import Application from "./components/Application/Application.js"

import "chota";
import "./base.css";

import { Provider } from 'react-redux';
import store from './redux/store.js'

const rootElement = document.getElementById('root');
console.log("Initial store created:")
console.log(store.getState())
ReactDOM.render((
    <Provider store={store}>
        <Application />
    </Provider>
), rootElement);
