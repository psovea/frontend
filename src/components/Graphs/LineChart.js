/* LineChart.js:
 * Discription: This is the component of a LineChart. This is used to be shown in a grid box.
 *              Data is obtained from an API.
 */

import React from 'react';
import {Line} from 'react-chartjs-2';
import './Graphs.css';

const data = {
    /* Labels of the x-axis. */
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
        /* The label of the line. */
        label: 'testline',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        /* The y-values. */
        data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

const content = <div className="dashboard-widget-content" id="bar">
                    <Line data={data} options={{ responsive:true, maintainAspectRatio: false }}/>
                </div>;

const settings = (state) => <div className={"dashboard-widget-content-settings " + (state.settings ? "show" : "hide")} id="bar">
                    <div className="dashboard-widget-content-settings-container">
                    </div>
                    <div className="dashboard-widget-content-settings-buttons">
                        <div className="dashboard-widget-content-settings-buttons-container">
                            <button className="dashboard-widget-content-settings-buttons-button button outline primary"><i className="dashboard-widget-settings-button-icon fa fa-check"></i> apply</button>
                            <button className="dashboard-widget-content-settings-buttons-button button outline secondary"><i className="dashboard-widget-settings-button-icon fa fa-refresh"></i> reset</button>
                        </div>
                    </div>
                </div>

class LineChart extends React.Component {

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
                        <p className="dashboard-widget-header-title">title</p>
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

export default LineChart; 