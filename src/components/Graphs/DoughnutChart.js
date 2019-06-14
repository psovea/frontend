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

class DoughnutChart extends React.Component {

    // We store the dimensions of the dataContainer div.
	constructor(props) {
        super(props);
    }
    
    // The first render we call the actual render after storing the dimensions.
	render() {
        return (
            <div className="dashboard-widget">
                <div className="dashboard-widget-header row">
                    <div className="dashboard-widget-header-title-wrapper col-10">
                        <p className="dashboard-widget-header-title">Aantal vertragingen afgelopen maanden</p>
                    </div>

                    <div className="dashboard-widget-header-settings-wrapper col-2">
                        <i className="dashboard-widget-header-settings-wrapper-icon fa fa-sliders" aria-hidden="true"></i>
                    </div>
                </div>
                <div className="dashboard-widget-content" id="bar">
                    <Doughnut data={data} options={{ responsive:true, maintainAspectRatio: false }}/>
                </div>
            </div>
        );
	}
}

export default DoughnutChart; 
