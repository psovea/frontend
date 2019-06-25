/* BarChart.js:
 * Discription: This is the component of a Barchart. This is used to be shown in a grid box.
 *              Data is obtained from an API.
 */

import React from 'react';
import { Bar } from 'react-chartjs-2';
import './Graphs.css';
import Missing from '../Missing/Missing';


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
        if (this.state.data.length == 0) { return [] }

        var labelArray = this.state.data.map((x, i) => (i + 1) + " dagen").reverse()
        var dataArray = this.state.data.map(item => Math.round(item[0]['value'][1] / 3600)).reverse()
        let data = {
            labels: labelArray,
            datasets: [{
                data: dataArray,
                label: 'Vertraging (in uren)',
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
            this.state.data.length == 0
                ? <Missing/>
                : <Bar data={this.makeData()} options={{ responsive: true, maintainAspectRatio: false }} />
        )
    }
}

export default BarChart;
