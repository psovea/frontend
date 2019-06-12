import React, { Component } from 'react';

import './Sidebar.css';

import { Activity } from 'react-feather';

// Redux imports
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { changeCheck1Value } from '../../redux/actions/actions.js';


class SidebarDataCheckboxes extends Component {

    constructor(props) {
		super(props);
		this.state = {
            check1Checked: true,
		};

        this.check1Change = this.check1Change.bind(this);
    }

    check1Change() {
        if (this.state.check1Checked == true) {
            this.setState({
                check1Checked: false
            });
        } else {
            this.setState({
                check1Checked: true
            });
        }
        console.log("updating state")
        this.props.changeCheck1Value(this.state.check1Checked);
    }

    render() {
        return (
            <div>
                <div className="section-title">
                    <Activity />
                    <a href="#">Data</a>
                </div>
                <div>
                    <div className="row">
                        <div className="col-8">
                            <label>Show 1</label>
                        </div>
                        <div className="col-4"> 
                            <input 
                                type="checkbox" 
                                id="check1" 
                                name="check1" 
                                value="check1" 
                                checked={this.state.check1Checked}
                                onChange={this.check1Change}
                            />
                        </div>
                    </div>
    
                    <div className="row">
                        <div className="col-8">
                            <label>Show 2</label>
                        </div>
                        <div className="col-4">
                            {/* <input type="checkbox" id="doughnut" name="doughnut" value="doughnut" checked={this.state.doughnutChecked} onChange={this.doughnutChange} /> */}
                        </div>
                    </div>
                
                    <div className="row">
                        <div className="col-8">
                            <label>Show 3</label>
                        </div>
                        <div className="col-4">
                            {/* <input type="checkbox" id="bgraph" name="bar" value="bar" checked={this.state.barChecked} onChange={this.barChange}/> */}
                        </div>
                    </div>    
                </div>
            </div>
        )
    }
}

SidebarDataCheckboxes.propTypes = {
    changeCheck1Value: PropTypes.func.isRequired
};

export default connect( null, { changeCheck1Value })(SidebarDataCheckboxes);