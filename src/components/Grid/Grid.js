import chota from "chota";
import React from 'react';
import "./Grid.css"
import DataContainer from '../DataContainer/DataContainer.js'

class Grid extends React.Component {
    render() {
        return (
            <div class="grid">
                <div class="row">
                    <div class="col-4"> <DataContainer rows="2" collumns="2"/> </div>
                    <div class="col-4"> </div>
                    <div class="col-4"> <DataContainer rows="3" collumns="1"/> </div>
                </div>
                <div class="row">
                    <div class="col-4"> </div>
                    <div class="col-4"> </div>
                    <div class="col-4"> </div>
                </div>
                <div class="row">
                    <div class="col-4"> <DataContainer rows="1" collumns="1"/> </div>
                    <div class="col-4"> <DataContainer rows="1" collumns="1"/> </div>
                    <div class="col-4"> </div>
                </div>
            </div>
        );
    }
}

export default Grid;
