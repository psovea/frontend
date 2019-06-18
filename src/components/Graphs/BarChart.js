/* BarChart.js:
 * Discription: This is the component of a Barchart. This is used to be shown in a grid box.
 *              Data is obtained from an API.
 */

import React from 'react';
import { Bar } from 'react-chartjs-2';
import './Graphs.css';

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'Vertraging',
            backgroundColor: 'rgba(255,99,132,0.2)',
            borderColor: 'rgba(255,99,132,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};

class BarChart extends React.Component {
    // We store the dimensions of the dataContainer div.
    constructor(props) {
        super(props);
    }

    // The first render we call the actual render after storing the dimensions.
    render() {
        return (
            <Bar data={data} options={{ responsive:true, maintainAspectRatio: false }}/>
        )
    }
}

export default BarChart;
