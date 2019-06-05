import chota from "chota";
import React from 'react';
import DataContainer from './DataContainer'
// import css from ""

class Grid extends React.Component {
    render() {
        return (
            <div class="grid">
                <div class="row">
                    <div class="col-4"> <DataContainer/> </div>
                    <div class="col-4"> .col-4 </div>
                    <div class="col-4"> .col-4 </div>
                </div>
                <div class="row">
                    <div class="col-4"> .col-4 </div>
                    <div class="col-4"> .col-4 </div>
                    <div class="col-4"> .col-4 </div>
                </div>
                <div class="row">
                    <div class="col-4"> .col-4 </div>
                    <div class="col-4"> .col-4 </div>
                    <div class="col-4"> .col-4 </div>
                </div>
            </div>
        );
    }
}

export default Grid;