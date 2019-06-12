import React from 'react';
import { Compass, Truck, Search, Activity } from 'react-feather';
import './Sidebar.css';

// import toggleDoughnut from '../../redux/actions.js'

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hmapChecked: true,
			doughnutChecked: true,
			barChecked: true,
			listChecked: true,
		};

		// this.handleInputChange = this.toggleChange.bind(this);
	}

	hmapChange = () => {
		this.setState({
			hmapChecked: !this.state.hmapChecked,
        });
	}
	doughnutChange = () => {
		this.setState({
			doughnutChecked: !this.state.doughnutChecked,
		});
	}
	barChange = () => {
		this.setState({
			barChecked: !this.state.barChecked,
		});
	}
	listChange = () => {
		this.setState({
			listChecked: !this.state.listChecked,
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
                            <div className="col-4"><input type="checkbox" name="train" value="train" defaultChecked /></div>
		        </div>

		        <div className="row">
			    <div className="col-8"><label>Bus</label></div>
			    <div className="col-4"><input type="checkbox" name="bus" value="bus" /></div>
		        </div>
		    
		        <div className="row">
			    <div className="col-8"><label>Tram</label></div>
                            <div className="col-4"><input type="checkbox" name="tram" value="tram" defaultChecked /></div>
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
                            <div className="col-4"> <input type="checkbox" id="hmap" name="heatmap" value="heatmap" checked={this.state.hmapChecked} onChange={this.hmapChange} /></div>
		        </div>

		        <div className="row">
			    <div className="col-8"><label>Show doughnut chart</label></div>
			   				<div className="col-4"> <input type="checkbox" id="doughnut" name="doughnut" value="doughnut" checked={this.state.doughnutChecked} onChange={this.doughnutChange} /></div>
		        </div>
		    
		        <div className="row">
			    <div className="col-8"><label>Show bar graph</label></div>
                			<div className="col-4"> <input type="checkbox" id="bgraph" name="bar" value="bar" checked={this.state.barChecked} onChange={this.barChange}/></div>
		        </div>

				<div className="row">
			    <div className="col-8"><label>Show list</label></div>
                            <div className="col-4"> <input type="checkbox" id="list" name="list" value="list" checked={this.state.listChecked} onChange={this.listChange} /></div>
		        </div>
				
		    
		    </div>
                </div>
            </div>    
        );
    }
}

export default Sidebar;
