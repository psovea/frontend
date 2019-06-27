/* BarChart.js:
 * Description:
 * Wrapper class for the react-charts bar chart.
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

    /* Shows a given date in dd:mm format. */
    getFormattedDate(daysAgo) {
        var dayTime = new Date()
        dayTime.setDate(dayTime.getDate() - daysAgo)
        var day = dayTime.getDate()
        var month = dayTime.getMonth() + 1
        return `${day}/${month}`
    }

    /* Creates an object that can be passed to the bar chart.*/
    mkChartData = (labels, data) => (
        {
            labels: labels,
            datasets: [{
                data: data,
                label: 'Vertraging',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)'
            }]
        }
    )

    /* Format the data such that it can be shown as a bar chart. */
    formatData() {
        if (this.state.data.length == 0) { return [] }

        var labels = this.state.data.map((x, i) => this.getFormattedDate(i + this.state.offset + 1)).reverse()
        var data = this.state.data.map(item => Math.round(item['value'][1])).reverse()

        return this.mkChartData(labels, data)
    }

    render() {
        return (
            this.state.data.length == 0
                ? <Missing/>
                :<Bar
                    data={this.formatData()}
                    options={
                        { responsive: true,
                          maintainAspectRatio: false,
                          scales: {
                              yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'tijd (s)'
                                }
                              }]
                            }
                        }}
                  />
        )
    }
}

export default BarChart;
