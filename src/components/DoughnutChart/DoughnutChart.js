import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import './DoughnutChart.css';
// import ReactResizeDetector from 'react-resize-detector';

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

const options = {
	responsive: true,
	maintainAspectRatio: true
}



class DoughnutChart extends React.Component {
	// onResize() {
	// 	console.log('Changed')
	// 	return (
  //     <div>
	// 			<Doughnut data={data} width={dimensions.width} height={dimensions.height} options={{ maintainAspectRatio: false }}/>
	// 			{/* <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} /> */}
  //     </div>
  //   );
	// }
	
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
				{/* <ReactResizeDetector onResize={this.onResize} /> */}
      </div>
    );
  }

	render() {
    const { dimensions } = this.state;
    return (
      <div id="parentDiv" className="Doughnut" ref={el => (this.container = el)} onChange={this.handleChange}>
				{dimensions && this.renderContent()}
				{/* <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} /> */}
      </div>
    );
	}
	
}

export default DoughnutChart; 
