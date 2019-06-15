import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import './Graphs.css';

const data = {
	labels: [
		'Red',
		'Green',
		'Yellow'
	],
	datasets: [{
		data: [300, 50, 100],
		backgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		],
		hoverBackgroundColor: [
		'#FF6384',
		'#36A2EB',
		'#FFCE56'
		]
	}]
};

const content = <div className="dashboard-widget-content" id="bar">
                    <Doughnut data={data} options={{ responsive:true, maintainAspectRatio: false }}/>
                </div>;

const settings = <div className="dashboard-widget-content" id="bar">
                    <div className="dashboard-widget-settings-buttonbar">
                        <i className="dashboard-widget-settings-button fa fa-undo"></i>
                        <i className="dashboard-widget-settings-button fa fa-check"></i>
                    </div>
                </div>;

class DoughnutChart extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
            showing: content,
        }

        this.settingsClicked = this.settingsClicked.bind(this);
    }

    settingsClicked() {
        this.state.showing == content ? this.setState({showing: settings}) : this.setState({showing : content})
    }


	render() {
        const settingsIcon = <i className="dashboard-widget-header-settings-wrapper-icon fa fa-sliders" aria-hidden="true"/>
        const backIcon = <i className="dashboard-widget-header-settings-wrapper-icon fa fa-reply" aria-hidden="true"/>

        return (
            <div className="dashboard-widget">
                <div className="dashboard-widget-header row">
                    <div className="dashboard-widget-header-title-wrapper col-10">
                        <p className="dashboard-widget-header-title">Aantal vertragingen afgelopen maanden</p>
                    </div>

                    <div className="dashboard-widget-header-settings-wrapper col-2" onClick={this.settingsClicked}>
                        {this.state.showing == content ? settingsIcon : backIcon}
                    </div>
                </div>
                {this.state.showing}
            </div>
        );
	}
}

export default DoughnutChart; 
