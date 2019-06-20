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
    constructor(props) {
        super(props);
        this.state = {
            delays: [],
        }
    }

    update = (newState) => this.setState(newState)

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
            this.setState({delays: json});
        })
    }

    componentDidMount() {
        this.fetchJSON('http://18.224.29.151:5000/get-district-delays', "delays")
    }

    makeData() {
        var labelArray = []
        var dataArray = []
        this.state.delays.forEach(item => labelArray.push(Object.keys(item)[0]));
        this.state.delays.forEach(item => dataArray.push(Object.values(item)[0]));
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
            <Bar data={this.makeData()} options={{ responsive:true, maintainAspectRatio: false }}/>
        )
    }
}

export default BarChart;
