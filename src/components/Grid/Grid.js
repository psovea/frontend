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
            <ResponsiveGridLayout className="grid"
                breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                cols={{ lg: 3, md: 3, sm: 2, xs: 2, xxs: 2 }}
            >
                {/* x and y are the position of the block on the grid. w is the width and h the height of the block. */}
                <div key="pie" className="pie" data-grid={{ x: 0, y: 0, w: 1, h: 2, maxW: 1 }}>Amazing pie chart</div>
                <div key="map" data-grid={{ x: 2, y: 0, w: 2, h: 2, static: true }} >
                    <Maps />
                </div>
                
                <div key="stats" className="stats" data-grid={{ x: 0, y: 2, w: 2, h: 3 }}>Other amazing stats</div>
                <div key="bottle" className="stats" data-grid={{ x: 2, y: 2, w: 1, h: 3 }}>
                    <h1>Top 10 bottlenecks:</h1>
                    1. <br></br>
                    2. <br></br>
                    3. <br></br>
                    4. <br></br>
                    5. <br></br>
                    6. <br></br>
                    7. <br></br>
                    8. <br></br>
                    9. <br></br>
                    10. <br></br>
                </div>
                <div key="chart" data-grid={{ x: 0, y: 5, w: 3, h: 2 }}>
                    <Graph />
                </div>
                
            </ResponsiveGridLayout>
        )
    }
}

export default Grid;
