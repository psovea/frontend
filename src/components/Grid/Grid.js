/* Grid.js:
 * Discription: This file contains the main body. The body contains of a 4x4 grid.
 *              Grid box containers can be made here. Data graphs are shown in these boxes.
 *              Each box has there own x,y position in the grid.
 *              In this file you can change the width and height of these boxes.
 */

import React, { Component } from "react"
import { Responsive, WidthProvider } from "react-grid-layout"
import BarChart from "../Graphs/BarChart"
import DoughnutChart from "../Graphs/DoughnutChart"
import Widget from "../Widget/Widget"
import Delays from "../Feed/Delays"
import Slider from 'rc-slider'
import Maps from "../Maps/Maps"
import DataTable from "../Table/Table"


// We need these css imports, else the graphics will glitch
// while moving components in our grid.
import "../../../node_modules/react-grid-layout/css/styles.css"
import "../../../node_modules/react-resizable/css/styles.css"
import "./Grid.css";
import 'rc-slider/assets/index.css'

const ResponsiveGridLayout = WidthProvider(Responsive)


// This defines the grid; here we add other components (lets call
// them widgets). Unfortunately we have to add div's directly into
// the ResponiveGridLayout, in these divs we can put our widgets.
// I have not found a way to work around this yet.
class Grid extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="dashboard-container">
                <ResponsiveGridLayout
                    className="grid"
                    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                    cols={{ lg: 4, md: 4, sm: 2, xs: 1, xxs: 1 }}
                    isDraggable={false}
                    isResizable={false}
                >
                    <div key="barchart-1" data-grid={{ x: 0, y: 0, w: 1, h: 2 }}>
                        <Widget
                            component={<BarChart />}
                            title="Vertraging per dag"
                            componentId="bar"
                            settings={[(f) => <Slider onChange={f} min={20} defaultValue={20} marks={{ 20: "1 dag", 40: "3 dagen", 60: "1 week", 100: "2 weken" }} step={null} key='slider2' />]}
                            names={{ 0: "dagen" }}
                        />
                    </div>

                    <div key="barchart-2" data-grid={{ x: 2, y: 3, w: 1, h: 2 }}>
                        <Widget
                            component={<DoughnutChart />}
                            title="Vertraging per vervoersmiddel"
                            componentId="bar"
                            settings={[
                                (f) => <Slider onChange={f} min={20} defaultValue={20} marks={{ 20: "1 dag", 40: "3 dagen", 60: "1 week", 100: "2 weken" }} step={null} key='slider' />,
                                (f) => <Slider onChange={f} min={20} defaultValue={20} marks={{ 20: "1 week", 40: "3 weken", 60: "5 week", 100: "10 weken" }} step={null} key='slider1' />
                            ]}
                            names={{ 0: "dagen", 1: "weken" }}
                        />
                    </div>

                    <div key="barchart-3" data-grid={{ x: 1, y: 0, w: 1, h: 2 }}>
                        <Widget
                            component={<DataTable
                                headers={["Lijn", "Halte", "Vervoerder"]}
                                values={[
                                    ["22", "Centraal Station", "GVB"],
                                    ["23", "Centraal Station", "GVB"],
                                    ["24", "Centraal Station", "GVB"],
                                    ["25", "Centraal Station", "GVB"],
                                    ["26", "Centraal Station", "GVB"]
                                ]}
                                numShow={0}
                            />}
                            title="Top 5 vertragingen"
                            componentId="table"
                            settings={[(f) => <Slider onChange={f} min={1} defaultValue={1} marks={{ 1: "1", 2: "2", 3: "3", 4: "4" }} step={null} key='slider3' />]}
                            defaultSettings={{ numShow: 0 }}
                            names={{ 0: "numShow" }}
                        />
                    </div>

                    <div key="barchart-4" data-grid={{ x: 3, y: 3, w: 1, h: 2 }}>
                        <Widget
                            component={<BarChart />}
                            title="Vertraging per maand"
                            componentId="bar"
                            settings={[(f) => <Slider onChange={f} min={20} defaultValue={20} marks={{ 20: "1 dag", 40: "3 dagen", 60: "1 week", 100: "2 weken" }} step={null} key='slider4' />]}
                            names={{ 0: "dagen", 1: "weken" }}
                        />

                    </div>
                    <div key="map" data-grid={{ x: 2, y: 0, w: 2, h: 3 }}>
                        <Widget
                            component={<Maps />}
                            title="Vertraging in regio Amsterdam"
                            componentId="map"
                            settings={[
                                (f) => <Slider
                                    onChange={f}
                                    min={20}
                                    defaultValue={20}
                                    marks={{
                                        25: "Afgelopen Uur",
                                        50: "Afgelopen Dag",
                                        75: "Afgelopen Week",
                                        100: "Afgelopen Maand"
                                    }}
                                    step={null}
                                    key='slider5' />
                            ]}
                            names={{ 0: "slider" }}
                        />
                    </div>

                    <div key="feed" data-grid={{ x: 0, y: 2, w: 2, h: 3 }}>
                        <Widget
                            component={<Delays />}
                            title="Live vertraging"
                            componentId="feed"
                            settings={[(f) => <Slider onChange={f} min={20} defaultValue={20} marks={{ 20: "1 dag", 40: "3 dagen", 60: "1 week", 100: "2 weken" }} step={null} key='slider' />]}
                            names={{ 0: "dagen" }}
                        />
                    </div>

                </ResponsiveGridLayout>
            </div>
        )
    }
}
export default Grid
