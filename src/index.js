/* eslint no-unused-vars: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import Application from "./components/Application/Application.js"

import "chota";
import "./base.css";

import { stateHandler } from './redux/reducers.js'

import { Provider } from 'react-redux';
import { createStore } from 'redux';

const store = createStore(stateHandler);

const rootElement = document.getElementById('root');

ReactDOM.render((
    <Provider store={store}>
        <Application />
    </Provider>
), rootElement);
