import React, { Component } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import BarChart from '../Graphs/BarChart'
import DoughnutChart from '../Graphs/DoughnutChart'
import Delays from '../Feed/Delays'

// We need these css imports, else the graphics will glitch
// while moving components in our grid.
import '../../../node_modules/react-grid-layout/css/styles.css';
import '../../../node_modules/react-resizable/css/styles.css';
import './Grid.css';
import Maps from '../Maps/Maps';
import DataTable from '../Table/Table';


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
                <div key="barchart-1" data-grid={{ x: 0, y: 0, w: 1, h: 2}}><BarChart/></div>
                <div key="barchart-2" data-grid={{ x: 1, y: 0, w: 1, h: 2}}><DoughnutChart/></div>
                <div key="barchart-3" data-grid={{ x: 2, y: 0, w: 1, h: 2}}>
                  <DataTable headers={["Lijn", "Halte", "Vervoerder"]} values={[["22", "Centraal Station", "GVB"], ["23", "Centraal Station", "GVB"], ["24", "Centraal Station", "GVB"], ["25", "Centraal Station", "GVB"], ["26", "Centraal Station", "GVB"]]}/>
                </div>
                <div key="barchart-4" data-grid={{ x: 3, y: 0, w: 1, h: 2}}><BarChart/></div>
                <div key="map" data-grid={{ x: 2, y: 2, w: 2, h: 3}}><Maps/></div>
                <div key="feed" data-grid={{ x: 0, y: 2, w: 2, h: 3}}><Delays/></div>
            </ResponsiveGridLayout>
            </div>
        )}
}
export default Grid;