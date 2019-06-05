import chota from "chota";
import React from 'react';
import Graph from './Graph'



class Grid extends React.Component {
    render() {
        return (
            <div>
                <div>
                    <h3>This is a heading in a div element</h3>
                    <p>This is some text in a div element.</p>
                </div>
                <div>
                    <div className="row">
                        <div className="col-4"> <Graph /> </div>
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
            </div>
        );
    }
}

export default Grid;