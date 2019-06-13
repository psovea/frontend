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
            centrum: true,
            newWest: true,
            noord: true,
            oost: true,
            west: true,
            westpoort: true,
            zuid: true,
            zuidoost: true,
		};

        this.onChange = this.onChange.bind(this);
        this.editState = this.editState.bind(this);
    }

    editState(districtChecked) {
        var updatedState = this.state;
        if (this.state[districtChecked] === true) {
            this.setState({
                [districtChecked]: false
            });
            updatedState[districtChecked] = false;
            this.props.toggleDistrict(updatedState);
        } else {
            this.setState({
                [districtChecked]: true
            });
            updatedState[districtChecked] = true;
            this.props.toggleDistrict(updatedState);
        }
    }

    onChange(e) {
        this.editState(e.target.id);
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
                            checked={this.state.centrum}
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
                            id="newWest" 
                            name="newWest" 
                            value="newWest" 
                            checked={this.state.newWest}
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
                            checked={this.state.noord}
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
                            checked={this.state.oost}
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
                            checked={this.state.west}
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
                            checked={this.state.westpoort}
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
                            checked={this.state.zuid}
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
                            checked={this.state.zuidoost}
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