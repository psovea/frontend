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

const DoughnutChart = () => <Doughnut data={data} options={{ responsive: true, maintainAspectRatio: false }} />

export default DoughnutChart; 
