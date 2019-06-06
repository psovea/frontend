import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import './DoughnutChart.css';

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
      dimensions: null,
		};
  }
	
	componentDidMount() {
    this.setState({
      dimensions: {
        width: this.container.offsetWidth,
        height: this.container.offsetHeight,
      },
		});
	}

	renderContent() {
    const { dimensions } = this.state;
    return (
      <div>
				<Doughnut data={data} width={dimensions.width} height={dimensions.height} options={{ maintainAspectRatio: false }}/>
      </div>
    );
  }

	render() {
    const { dimensions } = this.state;
    return (
      <div id="parentDiv" className="Doughnut" ref={el => (this.container = el)}>
				{dimensions && this.renderContent()}
      </div>
    );
	}
	
}

export default DoughnutChart; 
