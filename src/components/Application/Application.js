/* Application.js:
 * Discription: This file calls the Grid and NavBar components.
 *              All the data and graphs are shown in the grid componennt.
 */

import React from 'react';
import Grid from '../Grid/Grid.js';
import './Application.css';
import NavBar from '../NavBar/NavBar.js';

/* This class acts as our main and is called in index.html.*/
class Application extends React.Component {
    render() {
        return (
            <div className="dashboard">
                <NavBar/>
                <Grid />
            </div>
        );
    }
}

export default Application;
