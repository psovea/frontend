import React, { Component } from 'react';
import { Compass } from 'react-feather';


class SidebarRegionFilters extends Component {
    render() {
        return (
            <div>
                <div className="section-title">
                    <Compass />
                    <a href="#">Region</a>
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
                            // checked={this.state.check1Checked}
                            // onChange={this.check1Change}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-8">
                        <label>Zuid-oost</label>
                    </div>
                    <div className="col-4"> 
                        <input 
                            type="checkbox" 
                            id="zuid-oost" 
                            name="zuid-oost" 
                            value="zuid-oost" 
                            // checked={this.state.check1Checked}
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
                            // checked={this.state.check1Checked}
                            // onChange={this.check1Change}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-8">
                        <label>West-poort</label>
                    </div>
                    <div className="col-4"> 
                        <input 
                            type="checkbox" 
                            id="west-poort" 
                            name="west-poort" 
                            value="west-poort" 
                            // checked={this.state.check1Checked}
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
                            // checked={this.state.check1Checked}
                            // onChange={this.check1Change}
                        />
                    </div>
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
                            // checked={this.state.check1Checked}
                            // onChange={this.check1Change}
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="col-8">
                        <label>New-west</label>
                    </div>
                    <div className="col-4"> 
                        <input 
                            type="checkbox" 
                            id="new-west" 
                            name="new-west" 
                            value="new-west" 
                            // checked={this.state.check1Checked}
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
                            // checked={this.state.check1Checked}
                            // onChange={this.check1Change}
                        />
                    </div>
                </div>
            </div> 
        );
    }
}

export default SidebarRegionFilters;