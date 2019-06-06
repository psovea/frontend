import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import Graph from '../Graph/Graph.js';
import './Grid.css';
import Maps from '../Maps/Maps'
// We need these css imports, else the graphics will glitch
// while moving components in our grid.
import '../../../node_modules/react-grid-layout/css/styles.css';
import '../../../node_modules/react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

// This defines the grid; here we add other components (lets call
// them widgets). Unfortunately we have to add div's directly into
// the ResponiveGridLayout, in these divs we can put our widgets.
// I have not found a way to work around this yet.
class Grid extends React.Component {
    render() {
        return (
            <ResponsiveGridLayout
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 3, md: 3, sm: 2, xs: 2, xxs: 2 }}
            >
                <div key="pie" className="pie" data-grid={{ x: 0, y: 2, w: 1, h: 1, maxW: 1 }}>Amazing pie chart</div>
                <div key="stats" className="stats" data-grid={{ x: 1, y: 0, w: 2, h: 1 }}>Other amazing stats</div>
                <div key="chart" data-grid={{ x: 0, y: 3, w: 3, h: 2 }}>
                    <Graph />
                </div>
                <div key="map" data-grid={{x: 0, y: 3, w:3, h:3}} >
                    <Maps />
                </div>
            </ResponsiveGridLayout>
        )
    }
}

export default Grid;
