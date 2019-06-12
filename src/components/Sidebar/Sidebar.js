import React from 'react';
import { Compass, Truck, Search } from 'react-feather';
import SidebarDataCheckboxes from './SidebarDataCheckboxes.js';
import './Sidebar.css';

// Redux imports
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeTestValue } from '../../redux/actions/actions.js';

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};

        this.onSubmit = this.onSubmit.bind(this);
		// this.handleInputChange = this.toggleChange.bind(this);
    }
    
    onSubmit(e) {
        e.preventDefault();

        console.log("updating state")
        this.props.changeTestValue("updatedValue");
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
            // <div>
            //     <form onSubmit={this.onSubmit}>
            //         <button type="submit">Submit</button>
            //     </form>
            // </div>
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
                        <div className="col-8">
                            <label>Train</label>
                        </div>
                        <div className="col-4">
                            <input type="checkbox" name="train" value="train" defaultChecked />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-8">
                            <label>Bus</label>
                        </div>
                        <div className="col-4">
                            <input type="checkbox" name="bus" value="bus" />
                        </div>
                    </div>
                
                    <div className="row">
                        <div className="col-8">
                            <label>Tram</label>
                        </div>
                        <div className="col-4">
                            <input type="checkbox" name="tram" value="tram" defaultChecked />
                        </div>
                    </div>
                </div>
            </div>
            <SidebarDataCheckboxes />
        </div>    
        );
    }
}

Sidebar.propTypes = {
    changeTestValue: PropTypes.func.isRequired
};

export default connect( null, { changeTestValue })(Sidebar);
