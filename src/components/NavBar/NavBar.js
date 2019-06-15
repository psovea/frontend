import React, { Component } from 'react';

import './NavBar.css';

class NavBar extends Component {
    
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="navbar">
                <h1 className="navbar-title">psovea</h1>
            </div>
        )
    }
}

export default NavBar;