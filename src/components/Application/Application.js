import chota from "chota";
import React from 'react';
import Grid from '../Grid/Grid.js';
import Sidebar from '../Sidebar/Sidebar.js';
import './Application.css';

class Application extends React.Component {
    render() {
        return (
        <div id="main" class="row">
            <div class="col-2">
                <Sidebar />
            </div>
            <div class="col-10">
                <Grid />
            </div>
        </div>
        );
    }
}

export default Application;