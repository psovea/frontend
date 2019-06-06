import React from 'react';
import Grid from '../Grid/Grid.js';
import Sidebar from '../Sidebar/Sidebar.js';
import './Application.css';

/* This class acts as our main and is called in index.html.*/
class Application extends React.Component {
    render() {
        return (
        /* We create 1 row which we split in 2 columns. */
        <div id="main" className="row">
            {/* First column is the sidebar. */}
            <div id="sbar" className="col-2">
                <Sidebar />
            </div>
            {/* Second column is used for the dashboards grid. */}
            <div className="col-10">
                <Grid />
            </div>
        </div>
        );
    }
}

export default Application;
