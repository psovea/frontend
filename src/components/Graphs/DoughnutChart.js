import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
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

const settings = (state) => <div className={"dashboard-widget-content-settings " + (state.settings ? "show" : "hide")} id="bar">
                    <div className="dashboard-widget-content-settings-container">
                        <div className="dashboard-widget-content-settings-container-content">
                            <p className="dashboard-widget-content-settings-container-content-title">Slider</p>
                            <hr/>
                            <Slider min={20} defaultValue={20} marks={{ 20: "1 dag", 40: "3 dagen", 60: "1 week", 100: "2 weken" }} step={null} />
                        </div>
                        <div className="dashboard-widget-content-settings-container-content">
                            <p className="dashboard-widget-content-settings-container-content-title">Vervoerstype</p>
                            <hr/>

                        </div>
                        <div className="dashboard-widget-content-settings-container-content">
                            <p className="dashboard-widget-content-settings-container-content-title">Slider</p>
                            <hr/>
                        </div>
                        <div className="dashboard-widget-content-settings-container-content">
                            <p className="dashboard-widget-content-settings-container-content-title">Vervoerstype</p>
                            <hr/>

                        </div>
                        <div className="dashboard-widget-content-settings-container-content">
                            <p className="dashboard-widget-content-settings-container-content-title">Slider</p>
                            <hr/>
                        </div>
                        <div className="dashboard-widget-content-settings-container-content">
                            <p className="dashboard-widget-content-settings-container-content-title">Vervoerstype</p>
                            <hr/>
                        </div>
                    </div>
                    <div className="dashboard-widget-content-settings-buttons">
                        <div className="dashboard-widget-content-settings-buttons-container">
                            <button className="dashboard-widget-content-settings-buttons-button button outline primary"><i className="dashboard-widget-settings-button-icon fa fa-check"></i> apply</button>
                            <button className="dashboard-widget-content-settings-buttons-button button outline secondary"><i className="dashboard-widget-settings-button-icon fa fa-refresh"></i> reset</button>
                        </div>
                    </div>
                </div>

class DoughnutChart extends React.Component {

	constructor(props) {
        super(props);
        this.state = {
            settings: false,
        }

        this.settingsClicked = this.settingsClicked.bind(this);
    }

    settingsClicked() {
        this.setState({settings: !this.state.settings})
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
                        {settingsIcon}
                    </div>
                </div>
                {content}
                {settings(this.state)}
            </div>
        );
	}
}

export default DoughnutChart; 
