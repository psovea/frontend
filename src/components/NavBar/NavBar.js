/* NavBar.js:
 * Discription: This is the NavBar. This consists currently of Logo's.
 */

import React, { Component } from 'react';
import logo from '../../assets/logo_red.svg';
import andreas from '../../assets/andreaskruisen.svg'

import './NavBar.css';

class NavBar extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="navbar">
                <div className="logoleft">
                    <img src={logo}/>
                    <span>PSOVEA</span>
                </div>
                <div className="logoright">
                    <span>Amsterdam</span>
                    <img src={andreas}/>
                </div>
            </div>
        )
    }
}

export default NavBar;
