import React from 'react';
import DataContainer from '../DataContainer/DataContainer.js'
import './Grid.css'

class Grid extends React.Component {
    render() {
        return (
            <div className="grid">
                <div className="row">
                    <div className="col-4"> <DataContainer /> </div>
                    <div className="col-4"> .col-4 </div>
                    <div className="col-4"> .col-4 </div>
                </div>
                <div className="row">
                    <div className="col-4"> .col-4 </div>
                    <div className="col-4"> .col-4 </div>
                    <div className="col-4"> .col-4 </div>
                </div>
                <div className="row">
                    <div className="col-4"> .col-4 </div>
                    <div className="col-4"> .col-4 </div>
                    <div className="col-4"> .col-4 </div>
                </div>
            </div>
        );
    }
}

export default Grid;
