/* DoughnutChart.js:
 * Discription: This is the component of a DoughnutChart. This is used to be shown in a grid box.
 *              Data is obtained from an API.
 */

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
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

class DoughnutChart extends React.Component {
    // We store the dimensions of the dataContainer div.
    constructor(props) {
        super(props);
    }

    update(newState) {
        this.setState(newState)
    }
    
    render = () => (
        <Doughnut data={data} options={{ responsive: true, maintainAspectRatio: false }} />
    )
}

export default DoughnutChart; 
