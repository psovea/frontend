import React, { Component } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import BarChart from '../Graphs/BarChart'

// We need these css imports, else the graphics will glitch
// while moving components in our grid.
import '../../../node_modules/react-grid-layout/css/styles.css';
import '../../../node_modules/react-resizable/css/styles.css';
import './Grid.css';
import Maps from '../Maps/Maps';


const ResponsiveGridLayout = WidthProvider(Responsive)

// This defines the grid; here we add other components (lets call
// them widgets). Unfortunately we have to add div's directly into
// the ResponiveGridLayout, in these divs we can put our widgets.
// I have not found a way to work around this yet.
class Grid extends Component {
  constructor (props) {
    super(props)
  }

    render() {
        return (
            <div className="dashboard-container">
            <ResponsiveGridLayout className="grid"
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 4, md: 4, sm: 2, xs: 1, xxs: 1 }}
                isDraggable={false}
                isResizable={false}
            >
                <div key="barchart" data-grid={{ x: 0, y: 0, w: 2, h: 2}}><BarChart/></div>
                <div key="map" data-grid={{ x: 2, y: 0, w: 2, h: 3}}><Maps/></div>
            </ResponsiveGridLayout>
            </div>
        )


export default Grid;