import React, { Component } from 'react';
import { Compass } from 'react-feather';

// Redux imports
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
    toggleDistrict,
} from '../../redux/actions/actions.js';

class SidebarRegionFilters extends Component {
    constructor(props) {
		super(props);
		this.state = {
            centrumChecked: true,
            newwestChecked: true,
            noordChecked: true,
            oostChecked: true,
            westChecked: true,
            westpoortChecked: true,
            zuidChecked: true,
            zuidoostChecked: true,
		};

        this.onchange = this.centrumChange.bind(this);
    }

    onchange(event, key) {

    }

    render() {
        return (
            <div>
                <div className="section-title">
                    <Compass />
                    <a href="#">Region</a>
                </div>


                <div className="row">
                    <div className="col-8">
                        <label>Centrum</label>
                    </div>
                    <div className="col-4"> 
                        <input 
                            type="checkbox" 
                            id="centrum" 
                            name="centrum" 
                            value="centrum" 
                            checked={this.state.check1Checked}
                            // onChange={this.check1Change}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-8">
                        <label>New-West</label>
                    </div>
                    <div className="col-4"> 
                        <input 
                            type="checkbox" 
                            id="new-west" 
                            name="new-west" 
                            value="new-west" 
                            checked={this.state.check1Checked}
                            // onChange={this.check1Change}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-8">
                        <label>Noord</label>
                    </div>
                    <div className="col-4"> 
                        <input 
                            type="checkbox" 
                            id="noord" 
                            name="noord" 
                            value="noord" 
                            checked={this.state.check1Checked}
                            // onChange={this.check1Change}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-8">
                        <label>Oost</label>
                    </div>
                    <div className="col-4"> 
                        <input 
                            type="checkbox" 
                            id="oost" 
                            name="oost" 
                            value="oost" 
                            checked={this.state.check1Checked}
                            // onChange={this.check1Change}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-8">
                        <label>West</label>
                    </div>
                    <div className="col-4"> 
                        <input 
                            type="checkbox" 
                            id="west" 
                            name="west" 
                            value="west" 
                            checked={this.state.check1Checked}
                            // onChange={this.check1Change}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-8">
                        <label>Westpoort</label>
                    </div>
                    <div className="col-4"> 
                        <input 
                            type="checkbox" 
                            id="westpoort" 
                            name="westpoort" 
                            value="westpoort" 
                            checked={this.state.check1Checked}
                            // onChange={this.check1Change}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-8">
                        <label>Zuid</label>
                    </div>
                    <div className="col-4"> 
                        <input 
                            type="checkbox" 
                            id="zuid" 
                            name="zuid" 
                            value="zuid" 
                            checked={this.state.check1Checked}
                            // onChange={this.check1Change}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-8">
                        <label>Zuidoost</label>
                    </div>
                    <div className="col-4"> 
                        <input 
                            type="checkbox" 
                            id="zuidoost" 
                            name="zuidoost" 
                            value="zuidoost" 
                            checked={this.state.check1Checked}
                            // onChange={this.check1Change}
                        />
                    </div>
                </div>

            </div> 
        );
    }
}

SidebarDataCheckboxes.propTypes = {
    toggleDistrict: PropTypes.func.isRequired,
};

export default connect( null, { toggleDistrict })(SidebarRegionFilters);