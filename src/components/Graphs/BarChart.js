/* BarChart.js:
 * Discription: This is the component of a Barchart. This is used to be shown in a grid box.
 *              Data is obtained from an API.
 */

import React from 'react';
import { Bar } from 'react-chartjs-2';
import './Graphs.css';


class BarChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    update(newData) {
        this.setState({data: newData})
    }

    makeData() {
        if (!this.state.data) { return [] }

        var labelArray = this.state.data.map(item => (item['metric']['district']));
        var dataArray = this.state.data.map(item => Object.values(item['value'])[1]);
        let data = {
            labels: labelArray,
            datasets: [{
                data: dataArray,
                label: 'Vertraging',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
            }]
        }
        return data
    }

    render() {
        return (
            <Bar data={this.makeData()} options={{ responsive: true, maintainAspectRatio: false }} />
        )
    }
}

export default BarChart;
