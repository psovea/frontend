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
            data: [],
            offset: 0
        }
    }

    update(newData, newSettings) {
        this.setState({
            data: newData.flat(),
            offset: newSettings.range.offset
        })
    }

    getFormattedDate(daysAgo) {
        var dayTime = new Date()
        dayTime.setDate(dayTime.getDate() - daysAgo)
        var day = dayTime.getDate()
        var month = dayTime.getMonth() + 1
        return `${day}/${month}`
    }

    makeData() {
        if (this.state.data.length == 0) { return [] }

        var labelArray = this.state.data.map((x, i) => this.getFormattedDate(i + this.state.offset + 1)).reverse()
        var dataArray = this.state.data.map(item => Math.round(item['value'][1] / 3600)).reverse()
        let data = {
            labels: labelArray,
            datasets: [{
                data: dataArray,
                label: 'Vertraging (in uren)',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)'
            }]
        }
        return data
    }

    render() {
        return (
            this.state.data.length == 0
                ? <Missing/>
                : <Bar data={this.makeData()} options={{ responsive: true, maintainAspectRatio: false, scales: { yAxes: [{ ticks: { beginAtZero: true } }] } }} />
        )
    }
}

export default BarChart;
