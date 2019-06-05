import React from 'react';
import DataContainer from '../DataContainer/DataContainer.js'
import './Grid.css'

class Grid extends React.Component {
    render() {
        return (
            <div className="grid">
                <div className="row">
                    <div className="col-4"> <DataContainer rows="2" collumns="2"/> </div>
                    <div className="col-4"> </div>
                    <div className="col-4"> <DataContainer rows="3" collumns="1"/> </div>
                </div>
                <div className="row">
                    <div className="col-4"> </div>
                    <div className="col-4"> </div>
                    <div className="col-4"> </div>
                </div>
                <div className="row">
                    <div className="col-4"> <DataContainer rows="1" collumns="1"/> </div>
                    <div className="col-4"> <DataContainer rows="1" collumns="1"/> </div>
                    <div className="col-4"> </div>
                </div>
            </div>
        );
    }
}

export default Grid;
