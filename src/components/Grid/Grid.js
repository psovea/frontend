import React, { Component } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';

// Import the charts to show in the grid.
import Maps from '../Maps/Maps.js'
import BarChart from '../Graphs/BarChart.js';
import DoughnutChart from '../Graphs/DoughnutChart.js'

// We need these css imports, else the graphics will glitch
// while moving components in our grid.
import '../../../node_modules/react-grid-layout/css/styles.css';
import '../../../node_modules/react-resizable/css/styles.css';
import './Grid.css';

// Imports for redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const ResponsiveGridLayout = WidthProvider(Responsive);

// This defines the grid; here we add other components (lets call
// them widgets). Unfortunately we have to add div's directly into
// the ResponiveGridLayout, in these divs we can put our widgets.
// I have not found a way to work around this yet.
class Grid extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            testValue: props.testValue,
            field1Value: true
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        nextState.testValue = nextProps.testValue;
        nextState.field1Value = nextProps.field1Value;
        return true;
    }

    render() {
        return (
            <ResponsiveGridLayout className="grid"
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 3, md: 3, sm: 2, xs: 2, xxs: 2 }}
            >
                {/* x and y are the position of the block on the grid. w is the width and h the height of the block. */}
                <div key="1" className="pie" data-grid={{ x: 0, y: 0, w: 2, h: 2}}>
                    {String(this.state.field1Value)}
                </div>
                <div key="2" className="pie" data-grid={{ x: 2, y: 0, w: 1, h: 2}}>
                    <DoughnutChart />
                </div>
                <div key="3" className="pie" data-grid={{ x: 0, y: 2, w: 4, h: 3}}>
                    <BarChart />
                </div>
            </ResponsiveGridLayout>
        )
    }
}

Grid.propTypes = {
    testValue: PropTypes.string.isRequired,
    field1Value: PropTypes.bool
};

const mapStateToProps = state => {
    console.log("new state")
    console.log(state)
    return { 
        testValue: state.testValue,
        field1Value: state.check1Value
    }
}

export default connect(mapStateToProps, null)(Grid);