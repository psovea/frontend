import React from 'react';
import { Doughnut } from 'react-chartjs-2';
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

    // We store the dimensions of the dataContainer div.
	constructor(props) {
        super(props);
        this.state = {
            dimensions: null,
        };
    }
    
    // When the component is mounted we retrieve the dimensions.
	componentDidMount() {
        this.setState({
            dimensions: {
                width: this.container.offsetWidth,
                height: this.container.offsetHeight,
            },
        });
	}

    // We rerender and create a BarChart with the dimensions.
	renderContent() {
        const { dimensions } = this.state;
        return (
            <div className="DataContainer">
                <Doughnut data={data} width={dimensions.width} height={dimensions.height} options={{ maintainAspectRatio: false }}/>
            </div>
        );
    }

    // The first render we call the actual render after storing the dimensions.
	render() {
        const { dimensions } = this.state;
        return (
            <div className="DataContainer" ref={el => (this.container = el)}>
                {dimensions && this.renderContent()}
            </div>
        );
	}
}

export default DoughnutChart; 
