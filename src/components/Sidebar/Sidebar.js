import chota from "chota";
import React from 'react';
import './Sidebar.css';

class Sidebar extends React.Component {
    render() {
        return (
            <div className="sbar">
                <h3>BedrijfsNaam</h3>
                <h3>Regions</h3>
                <h3>Options</h3>
                <h3>Iets</h3>
                <h3>Nog iets</h3>
            </div>
            

        );
    }
}

export default Sidebar;