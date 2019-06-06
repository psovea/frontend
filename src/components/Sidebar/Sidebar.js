import React from 'react';
import { Compass, Truck, Search, Activity } from 'react-feather';
import './Sidebar.css';

class Sidebar extends React.Component {
    render() {
        return (
	    <div className="sbar">
                <a className="brand" href="#">psovea</a>

		<div>
		    <div className="section-title">
		        <Compass />
                        <a href="#">Region</a>

		    </div>

		    <div className="section-title">
		        <div className="col-9"><input type="text" name="region" /></div>
                        <div className="col-3">
		            <button className="button icon-only"><Search /></button>
		        </div>
		    </div>

                </div> 
		
		<div>
		    <div className="section-title">
		        <Truck />
                        <a href="#">Transport type</a>
		    </div>
		    <div>
		        <div className="row">
			    <div className="col-8"><label>Train</label></div>
                            <div className="col-4"><input type="checkbox" name="train" value="train" checked /></div>
		        </div>

		        <div className="row">
			    <div className="col-8"><label>Bus</label></div>
			    <div className="col-4"><input type="checkbox" name="bus" value="bus" /></div>
		        </div>
		    
		        <div className="row">
			    <div className="col-8"><label>Tram</label></div>
                            <div className="col-4"><input type="checkbox" name="tram" value="tram" checked /></div>
		        </div>
		    
		    </div>
                </div>

		<div>
		    <div className="section-title">
		        <Activity />
                        <a href="#">Data</a>
		    </div>
		    <div>
		        <div className="row">
			    <div className="col-8"><label>Show heatmap</label></div>
                            <div className="col-4"><input type="checkbox" name="heatmap" value="heatmap" checked /></div>
		        </div>

		        <div className="row">
			    <div className="col-8"><label>Show pie chart</label></div>
			    <div className="col-4"><input type="checkbox" name="pie" value="pie" checked /></div>
		        </div>
		    
		        <div className="row">
			    <div className="col-8"><label>Show bar graph</label></div>
                            <div className="col-4"><input type="checkbox" name="bar" value="bar" checked /></div>
		        </div>
		    
		    </div>
                </div>
            </div>    
        );
    }
}

export default Sidebar;
