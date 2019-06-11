import React from 'react';
import { Compass, Truck, Search, Activity } from 'react-feather';
import './Sidebar.css';

var Checkbox_heatmap = () => {
	this.setState({"chkbox": true})
}

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isChecked: true,
		};
	}
	toggleChange = () => {
		this.setState({
			isChecked: !this.state.isChecked,
		});
	}
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
                            <div className="col-4"> <input type="checkbox" id="hmap" name="heatmap" value="heatmap" checked={this.state.isChecked} onChange={this.toggleChange} /></div>
		        </div>

		        <div className="row">
			    <div className="col-8"><label>Show doughnut chart</label></div>
			   				<div className="col-4"> <input type="checkbox" id="doughnut" name="doughnut" value="doughnut"/></div>
		        </div>
		    
		        <div className="row">
			    <div className="col-8"><label>Show bar graph</label></div>
                			<div className="col-4"> <input type="checkbox" id="bgraph" name="bar" value="bar"/></div>
		        </div>

				<div className="row">
			    <div className="col-8"><label>Show list</label></div>
                            <div className="col-4"> <input type="checkbox" id="list" name="list" value="list"/></div>
		        </div>
				
		    
		    </div>
                </div>
            </div>    
        );
    }
}

export default Sidebar;
