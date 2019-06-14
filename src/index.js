/* eslint no-unused-vars: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import Application from "./components/Application/Application.js"

import "chota";
import "./base.css";

const rootElement = document.getElementById('root');
ReactDOM.render((
    <Application />
), rootElement);
