import React, { Component } from 'react';

import './Sidebar.css';

import { Activity } from 'react-feather';

// Redux imports
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { 
    changeCheck1Value,
    changeCheck2Value,
    changeCheck3Value, 
} from '../../redux/actions/actions.js';


class SidebarDataCheckboxes extends Component {

    constructor(props) {
		super(props);
		this.state = {
            check1Checked: true,
            check2Checked: true,
            check3Checked: true,
		};

        this.check1Change = this.check1Change.bind(this);
        this.check2Change = this.check2Change.bind(this);
        this.check3Change = this.check3Change.bind(this);
    }

    check1Change() {
        if (this.state.check1Checked === true) {
            this.setState({
                check1Checked: false
            });
            this.props.changeCheck1Value(false);
        } else {
            this.setState({
                check1Checked: true
            });
            this.props.changeCheck1Value(true);
        }
    }

    check2Change() {
        if (this.state.check2Checked === true) {
            this.setState({
                check2Checked: false
            });
            this.props.changeCheck2Value(false);
        } else {
            this.setState({
                check2Checked: true
            });
            this.props.changeCheck2Value(true);
        }
    }

    check3Change() {
        if (this.state.check3Checked === true) {
            this.setState({
                check3Checked: false
            });
            this.props.changeCheck3Value(false);
        } else {
            this.setState({
                check3Checked: true
            });
            this.props.changeCheck3Value(true);
        }
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
                            <input 
                                type="checkbox" 
                                id="check2" 
                                name="check2" 
                                value="check2" 
                                checked={this.state.check2Checked}
                                onChange={this.check2Change}
                            />
                        </div>
                    </div>
                
                    <div className="row">
                        <div className="col-8">
                            <label>Show 3</label>
                        </div>
                        <div className="col-4">
                            <input 
                                type="checkbox" 
                                id="check3" 
                                name="check" 
                                value="check3" 
                                checked={this.state.check3Checked}
                                onChange={this.check3Change}
                            />
                        </div>
                    </div>    
                </div>
            </div>
        )
    }
}

SidebarDataCheckboxes.propTypes = {
    changeCheck1Value: PropTypes.func.isRequired,
    changeCheck2Value: PropTypes.func.isRequired,
    changeCheck3Value: PropTypes.func.isRequired,
};

export default connect( null, { changeCheck1Value, changeCheck2Value, changeCheck3Value })(SidebarDataCheckboxes);