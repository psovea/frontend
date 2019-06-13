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

        this.onChange = this.onChange.bind(this);
        this.editState = this.editState.bind(this);
    }

    editState(districtChecked, districtName) {
        console.log(districtChecked)
        console.log(districtName)
        // this.setState({
        //     districtChecked: this.state.districtChecked
        // });
        if (this.state.districtChecked === true) {
            this.setState({
                districtChecked: false
            });
        } else {
            this.setState({
                districtChecked: true
            });
        }
        this.props.toggleDistrict(districtName);
    }

    onChange(e) {
        this.editState(e.target.id + "Checked", e.target.id)
        // switch (e.target.id) {
        //     case "centrum":
        //         this.editState("centrumChecked", "centrum")
        //     case "new-west":
        //         this.editState("centrumChecked", "centrum")
        //     case "noord":
        //         this.editState("centrumChecked", "centrum")
        //     case "oost":
        //         this.editState("centrumChecked", "centrum")
        //     case "west":
        //         this.editState("centrumChecked", "centrum")
        //     case "westpoort":
        //         this.editState("centrumChecked", "centrum")
        //     case "zuid":
        //         this.editState("centrumChecked", "centrum")
        //     case "zuidoost":
        //         this.editState("centrumChecked", "centrum")    
        // }
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
                            checked={this.state.centrumChecked}
                            onChange={this.onChange}
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
                            checked={this.state.newwestChecked}
                            onChange={this.onChange}
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
                            checked={this.state.noordChecked}
                            onChange={this.onChange}
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
                            checked={this.state.oostChecked}
                            onChange={this.onChange}
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
                            checked={this.state.westChecked}
                            onChange={this.onChange}
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
                            checked={this.state.westpoortChecked}
                            onChange={this.onChange}
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
                            checked={this.state.zuidChecked}
                            onChange={this.onChange}
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
                            checked={this.state.zuidoostChecked}
                            onChange={this.onChange}
                        />
                    </div>
                </div>
            </div> 
        );
    }
}

SidebarRegionFilters.propTypes = {
    toggleDistrict: PropTypes.func.isRequired,
};

export default connect( null, { toggleDistrict })(SidebarRegionFilters);