import React from 'react';
import DataContainer from '../DataContainer/DataContainer.js'
import Graph from '../Graph/Graph.js'
import './Grid.css'

class Grid extends React.Component {
    render() {
        return (
            <div className="grid">
		<div className="row">
		    <div className="col-4"><Graph /></div>	
		    <div className="col-4">1/3</div>	
		    <div className="col-4">1/3</div>	
		</div>

                <div className="row">
		    <div className="col-4">1/3</div>	
		    <div className="col-4">1/3</div>	
		    <div className="col-4">1/3</div>	
		</div>

                <div className="row">
		    <div className="col-4">1/3</div>	
		    <div className="col-4">1/3</div>	
		    <div className="col-4">1/3</div>	
		</div>
	    </div>
        );
    }
}

export default Grid;
