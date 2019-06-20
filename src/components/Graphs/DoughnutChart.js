/* DoughnutChart.js:
 * Discription: This is the component of a DoughnutChart. This is used to be shown in a grid box.
 *              Data is obtained from an API.
 */

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import 'rc-slider/assets/index.css';
import './Graphs.css';

class DoughnutChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            delays: [],
        }
    }

    fetchJSON(url, value) {
        // Hacky (wrong) way of handling CORS.
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
        this.fetchJSON('http://18.224.29.151:5000/get_delays?period=1d&return_filter[]=district&district[]=Centrum&district[]=Nieuw-West&district[]=Zuidoost&district[]=Noord&district[]=Oost&district[]=West&district[]=Westpoort&district[]=Zuid&top=8', "delays")
    }

    makeData() {
        var labelArray = this.state.delays.map(item => (item['metric']['district']));
        var dataArray = this.state.delays.map(item => Object.values(item['value'])[1]);
        let data = {
            labels: labelArray,
            datasets: [{
                data: dataArray,
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
        }
        return data
    }

    render() {
        console.log(this.state)
        return (
            <Doughnut data={this.makeData()} options={{ responsive: true, maintainAspectRatio: false }} />
        );
    }

}

export default DoughnutChart; 
