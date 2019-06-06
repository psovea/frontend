import React from 'react';
import { Bar } from 'react-chartjs-2';
import './Graph.css';

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

class Graph extends React.Component {

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
            <div class="Bar">
                <Bar data={data} width={dimensions.width} height={dimensions.height} options={{ maintainAspectRatio: false }}/>
            </div>
        );
    }

    render() {
        const { dimensions } = this.state;
        return (
          <div class="Bar" ref={el => (this.container = el)}>
                {dimensions && this.renderContent()}
          </div>
        );
        }
}

export default Graph; 
