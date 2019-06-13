import React from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
// import DataConTainerHeader from './DataContainerHeader.js'
// Import the charts to show in the grid.
import Maps from '../Maps/Maps.js'
import BarChart from '../Graphs/BarChart.js'
import DoughnutChart from '../Graphs/DoughnutChart.js'
import Feed from '../Feed/Feed.js'
import './Grid.css'

// We need these css imports, else the graphics will glitch
// while moving components in our grid.
import '../../../node_modules/react-grid-layout/css/styles.css'
import '../../../node_modules/react-resizable/css/styles.css'

const ResponsiveGridLayout = WidthProvider(Responsive)

// This defines the grid; here we add other components (lets call
// them widgets). Unfortunately we have to add div's directly into
// the ResponiveGridLayout, in these divs we can put our widgets.
// I have not found a way to work around this yet.
class Grid extends React.Component {
  render () {
    return (
      <ResponsiveGridLayout className='grid'
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 3, md: 3, sm: 2, xs: 2, xxs: 2 }}
      >
        {/* x and y are the position of the block on the grid. w is the width and h the height of the block. */}
        <div key='pie' className='pie' data-grid={{ x: 0, y: 0, w: 1, h: 2 }}>
          <DoughnutChart />
        </div>
        <div key='map' data-grid={{ x: 1, y: 0, w: 1, h: 2, static: true }} >
          <Maps />
        </div>
        <div key='feed' data-grid={{ x: 2, y: 0, w: 2, h: 4 }}>
          <h1>Real-time delays</h1>
          <Feed kind='delay' />
        </div>
        <div key='stats' className='stats' data-grid={{ x: 0, y: 2, w: 2, h: 3 }}>Other amazing stats</div>
        <div key='bottle' className='stats' data-grid={{ x: 2, y: 2, w: 1, h: 3 }}>
          <h1>Top 10 bottlenecks:</h1>
          <ol>
            <li>Centraal - Muiderpoort</li>
            <li>Nassaukade - Marnixplein</li>
            <li>Weesperplein - Frederiksplein</li>
            <li>Azartplein - Cornelis van Eesterenlaan</li>
            <li>Leidseplein - Spiegelgracht</li>
            <li>Marnixplein - Bloemgracht</li>
            <li>Alexanderplein - Hoogte Kadijk</li>
            <li>Sloterdijk - Centraal</li>
            <li>Weteringscircuit - Spiegelgracht</li>
            <li>Van Limburg Stirumstraat - De Wittenkade</li>
          </ol>
        </div>
        <div key='chart' data-grid={{ x: 0, y: 5, w: 3, h: 2 }}>
          <BarChart />
        </div>
      </ResponsiveGridLayout>
    )
  }
}

export default Grid
