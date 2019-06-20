/* BarChart.js:
 * Discription: This is the component of a Barchart. This is used to be shown in a grid box.
 *              Data is obtained from an API.
 */

import React from 'react';
import { Bar } from 'react-chartjs-2';
import './Graphs.css';

// const data = {
//     labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
//     datasets: [
//         {
//             label: 'Vertraging',
//             backgroundColor: 'rgba(255,99,132,0.2)',
//             borderColor: 'rgba(255,99,132,1)',
//             borderWidth: 1,
//             hoverBackgroundColor: 'rgba(255,99,132,0.4)',
//             hoverBorderColor: 'rgba(255,99,132,1)',
//             data: [65, 59, 80, 81, 56, 55, 40]
//         }
//     ]
// };

class BarChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            delays: [],
        }
    }

    fetchJSON(url) {
        url = 'https://cors-anywhere.herokuapp.com/' + url
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
        this.fetchJSON('http://18.224.29.151:5000/get_delays?period=1d&return_filter[]=district&district[]=Centrum&district[]=Nieuw-West&district[]=Zuidoost&district[]=Noord&district[]=Oost&district[]=West&district[]=Westpoort&district[]=Zuid&top=8', "delays")
    }

    makeData() {
        var labelArray = []
        var dataArray = []
        /* Put the label of the fetch data in the label array of the graph.
         * Put the data of the fetch data in the data array of the graph. */
        this.state.delays.forEach(item => labelArray.push(item['metric']['district']));
        this.state.delays.forEach(item => dataArray.push(Object.values(item['value'])[1]));
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
