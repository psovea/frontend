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
                <Bar data={data} width={dimensions.width} height={dimensions.height} options={{ maintainAspectRatio: false }}/>
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

export default BarChart;
