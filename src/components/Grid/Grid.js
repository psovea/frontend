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
            field1Value: true,
            field2Value: true,
            field3Value: true
        };
        
        this.shouldData1Render = this.shouldData1Render.bind(this);
        this.shouldData2Render = this.shouldData2Render.bind(this);
        this.shouldData3Render = this.shouldData3Render.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        nextState.field1Value = nextProps.field1Value;
        nextState.field2Value = nextProps.field2Value;
        nextState.field3Value = nextProps.field3Value;
        return true;
    }

    shouldData1Render() {
        var shouldRender = <div></div>;
        if (this.state.field1Value === true) {
            shouldRender = 
                <div key="1" className="pie" data-grid={{ x: 2, y: 0, w: 2, h: 4, static: true}}>
                    <Maps />
                </div>;
        }
        return shouldRender;
    }

    shouldData2Render() {
        var shouldRender = <div></div>;
        if (this.state.field2Value === true) {
            shouldRender = 
                <div key="2" className="pie" data-grid={{ x: 0, y: 0, w: 2, h: 4}}>
                    <DoughnutChart />
                </div>
        }
        return shouldRender;
    }

    shouldData3Render() {
        var shouldRender = <div></div>;
        if (this.state.field3Value === true) {
            shouldRender = 
                <div key="3" className="pie" data-grid={{ x: 0, y: 4, w: 4, h: 3}}>
                    <BarChart />
                </div>
        }
        return shouldRender;
    }

    render() {
        console.log(this.field1Value);
        return (
            <ResponsiveGridLayout className="grid"
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                // The grid is 4x4 or 2x2 when the resolution is small.
                cols={{ lg: 4, md: 4, sm: 2, xs: 2, xxs: 2 }}
            >
                {this.shouldData1Render()}
                {this.shouldData2Render()}
                {this.shouldData3Render()}
            </ResponsiveGridLayout>
        )
    }
}

Grid.propTypes = {
    field1Value: PropTypes.bool,
    field2Value: PropTypes.bool,
    field3Value: PropTypes.bool,
};

const mapStateToProps = state => {
    console.log("new state")
    console.log(state)
    return { 
        field1Value: state.check1Value,
        field2Value: state.check2Value,
        field3Value: state.check3Value,
    }
}

export default connect(mapStateToProps, null)(Grid);