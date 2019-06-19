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

    constructor(props) {
        super(props);
        this.state = {
            data: []
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
            jsonVar[value] = json;
            this.setState(jsonVar);
        })
    }
    componentDidMount() {
        this.fetchJSON('http://18.224.29.151:5000/get-district-delays', data)
    }

    render() {
        console.log(this.state.data)
        return (
            <Doughnut data={data} options={{ responsive: true, maintainAspectRatio: false }} />
        );
    }
    
}

export default DoughnutChart; 
