/* DoughnutChart.js:
 * Discription: This is the component of a DoughnutChart. This is used to be shown in a grid box.
 *              Data is obtained from an API.
 */

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import Missing from '../Missing/Missing';

import 'rc-slider/assets/index.css';
import './Graphs.css';

class DoughnutChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            delays: [],
        }
    }

    update(newData) {
        this.setState({delays: newData[0]});
    }

    makeData() {
        var labelArray = this.state.delays.map(item => (item['metric'][this.props.metric]));
        var dataArray = this.state.delays.map(item => Object.values(item['value'])[1]);
        let data = {
            labels: labelArray,
            datasets: [{
                data: dataArray,
                backgroundColor: this.props.colors,
                hoverBackgroundColor: this.props.colors
            }]
        }
        return data
    }

    render() {
        return (
            this.state.delays == null 
                ? <Missing/>
                : <Doughnut data={this.makeData()} options={{ responsive: true, maintainAspectRatio: false }} />
        );
    }

}

DoughnutChart.propTypes = {
    colors: PropTypes.any,
    metric: PropTypes.string
}

export default DoughnutChart; 
