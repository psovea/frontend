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
        'Red',
        'Red',
        'Red',
        'Red',
        'Red',
        'Red',
        'Red',
        'Red'
    ],
    datasets: [{
        data: [300, 50, 100, 230, 200, 100, 100, 100, 100],
        backgroundColor: [
            '#ff8080',
            '#ff6666',
            '#ff4d4d',
            '#ff3333',
            '#ff1a1a',
            '#ff0000',
            '#e60000',
            '#cc0000',
            '#b30000'
        ],
        hoverBackgroundColor: [
            '#ff8080',
            '#ff6666',
            '#ff4d4d',
            '#ff3333',
            '#ff1a1a',
            '#ff0000',
            '#e60000',
            '#cc0000',
            '#b30000'
        ]
    }]
};

class DoughnutChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            delays: []
        }
    }

    fetchJSON(url, value) {
        url = 'https://cors-anywhere.herokuapp.com/' + url
        let jsonVar = {}
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => {
            return res.json();
        }).then(json => {
            console.log({ value: json })
            jsonVar[value] = json;
            this.setState(jsonVar);
        })
    }
    componentDidMount() {
        this.fetchJSON('http://18.224.29.151:5000/get-district-delays', "delays")
    }

    render() {
        console.log(this.state.delays)
        return (
            <Doughnut data={this.state.delays} options={{ responsive: true, maintainAspectRatio: false }} />
        );
    }

}

export default DoughnutChart; 
