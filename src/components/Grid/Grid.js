import chota from "chota";
import React from 'react';

class Grid extends React.Component {
    render() {
        return (
            <div>
                <div class="grid-box">
                    <div class="test">
                        <h3>This is a heading in a div element</h3>
                        <p>This is some text in a div element.</p>
                    </div>
                    <div>
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
                        <div class="row">
                            <div class="col-4"> .col-4 </div>
                            <div class="col-4"> .col-4 </div>
                            <div class="col-4"> .col-4 </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Grid;