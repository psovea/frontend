import chota from "chota";
import React from 'react';
import Grid from '../Grid/Grid.js';
import Sidebar from '../Sidebar/Sidebar.js';
import './Application.css';
import Maps from '../Maps/Maps'

class Application extends React.Component {
    render() {
        return (
            <div id="main" className="row">
                <div className="col-2">
                    <Sidebar />
                </div>
                <div className="col-10">
                    <Grid />
                </div>
            </div>
        );
    }
}

export default Application;