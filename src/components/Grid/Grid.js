/* Grid.js:
 * Description: This file contains the main body. The body contains of a 4x4 grid.
 *              Grid box containers can be made here. Data graphs are shown in these boxes.
 *              Each box has their own x,y position in the grid.
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
import Searchbar from "../Searchbar/Searchbar"
import Calendar from "../Calendar/Calendar"

// We need these css imports, else the graphics will glitch
// while moving components in our grid.
import "../../../node_modules/react-grid-layout/css/styles.css"
import "../../../node_modules/react-resizable/css/styles.css"
import "./Grid.css"
import 'rc-slider'
import 'rc-slider/assets/index.css'

const ResponsiveGridLayout = WidthProvider(Responsive)
const DISTRICTS = ["Centrum", "Nieuw-West", "Zuidoost", "Noord", "Oost", "West", "Westpoort", "Zuid"]

/* This defines the grid; here we add other components (lets call
 * them widgets). Unfortunately we have to add div's directly into
 * the ResponiveGridLayout, in these divs we can put our widgets.
 * I have not found a way to work around this yet.
 */
class Grid extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    /* Update the state of the grid. This is purely for the searchbar, so
     * the selection of previous search bars influence the results of following
     * search bars.
     */
    updateState(widgetID, val) {
        this.setState({
            [widgetID]: val
        })
    }

    render() {
        return (
            <div className="dashboard-container">
                <ResponsiveGridLayout
                    className="grid"
                    breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
                    cols={{ lg: 12, md: 6, sm: 1, xs: 1, xxs: 1 }}
                    isDraggable={false}
                    isResizable={false}
                    containerPadding={[25, 25]}
                    margin={[30, 30]}
                >
                    <div key="barchart" data-grid={{ x: 6, y: 1, w: 6, h: 2 }}>
                        <Widget
                            component={<BarChart />}
                            title="Gemiddelde vertraging per dag (seconden)"
                            componentId="bar"
                            settings={[
                                (f) => <Calendar updater={f} perDay={true} />,

                                (f) => <Searchbar updater={f} options={["Bus", "Tram", "Metro", "Boot"]} multipleOptions={true} placeholderText={"vervoerstype"} key='search-transport'
                                />,

                                (f) => <Searchbar updater={f} endpoint={"get-lines"} params={this.state.bar} multipleOptions={false} placeholderText={"lijn"} key='search-line' filterFunc={(item) => `${item.public_id}: ${item.line_name}`}
                                />
                            ]}
                            defaultSettings={{
                                "range": {
                                    "days": 7,
                                    "offset": 0,
                                    "perDay": true
                                },
                                "district[]": DISTRICTS,
                                "transport_type[]": [""],
                                "line_number[]": [""],
                                "avg_per": "vehicle_delay",
                            }}
                            names={{ 0: "range", 1: "transport_type[]", 2: "line_number[]" }}
                            addSetting={this.updateState.bind(this)}
                            settingsTitles={["Periode", "Vervoersmiddel", "Lijn"]}
                        />
                    </div>

                    <div key="doughnut-district" data-grid={{ x: 3, y: 0, w: 3, h: 2 }}>
                        <Widget
                            component={<DoughnutChart metric="district" colors={['#ff6666', '#ff4d4d', '#ff3333', '#ff1a1a', '#ff0000', '#e60000', '#cc0000', '#b30000']} />}
                            title="Gem. vertraging per stadsdeel (seconden)"
                            componentId="bar"
                            settings={[
                                (f) => <Calendar updater={f} />
                            ]}
                            names={{ 0: "range" }}
                            addSetting={this.updateState.bind(this)}
                            defaultSettings={{
                                "return_filter[]": ["district"],
                                "district[]": DISTRICTS,
                                "transport_type[]": [""],
                                "range": {
                                    "days": 7,
                                    "offset": 0,
                                    "perDay": false
                                },
                                "top": 8,
                                "avg_per": "vehicle_delay"
                            }}
                            settingsTitles={["Periode"]}
                        />
                    </div>

                    <div key="map" data-grid={{ x: 6, y: 0, w: 6, h: 3 }}>
                        <Widget
                            component={<Maps />}
                            title="Vertraging in regio Amsterdam"
                            componentId="map"
                            settings={[
                                (f) => <Calendar updater={f} />,
                                (f) => <Searchbar
                                    updater={f}
                                    options={["TRAM", "BUS", "METRO"]}
                                    multipleOptions={true}
                                    placeholderText={"transporttype"}
                                    key="transport-type"
                                />,
                                (f) => <Searchbar
                                    updater={f}
                                    endpoint={"get-lines"}
                                    params={this.state.map}
                                    multipleOptions={true}
                                    placeholderText={"lijn"}
                                    key='search-line'
                                    filterFunc={(item) => `${item.public_id}: ${item.line_name}`}
                                />
                            ]}
                            names={{ 0: "range", 1: "transport_type[]", 2: "line_number[]" }}
                            settingsTitles={["Periode"]}
                            addSetting={this.updateState.bind(this)}
                            defaultSettings={{
                                "return_filter[]": ["stop_end"],
                                "district[]": DISTRICTS,
                                "line_number[]": [""],
                                "transport_type[]": [""],
                                "format": "heatmap",
                                "range": {
                                    "days": 7,
                                    "offset": 0,
                                    "perDay": false
                                },
                            }}
                        />
                    </div>

                    <div key="feed" data-grid={{ x: 0, y: 3, w: 6, h: 2 }}>
                        <Widget
                            component={<Delays />}
                            title="Live vertraging"
                            componentId="feed"
                            settings={[
                                (f) => <Slider onChange={f} min={86400} max={1209600} defaultValue={86400} marks={{ 86400: "1d", 172800: "2d", 259200: "3d", 432000: "5d", 604800: "1w", 1209600: "2w" }} step={null} key='slider1' />
                            ]}
                            names={{ 0: "period" }}
                            settingsTitles={["Periode"]}
                        />
                    </div>

                    <div key="doughnut-transporttype" data-grid={{ x: 0, y: 0, w: 3, h: 2 }}>
                        <Widget
                            component={<DoughnutChart metric="transport_type" colors={['#ff6666', '#ff4d4d', '#ff3333', '#ff1a1a', '#ff0000']} />}
                            title="Gem. vertraging per vervoerstype (seconden)"
                            componentId="bar"
                            settings={[
                                (f) => <Calendar updater={f} />

                            ]}
                            names={{ 0: "range" }}
                            defaultSettings={{
                                "return_filter[]": ["transport_type"],
                                "transport_type[]": [""],
                                "range": {
                                    "days": 7,
                                    "offset": 0,
                                    "perDay": false
                                },
                                "top": 8,
                                "avg_per": "vehicle_delay"
                            }}
                            settingsTitles={["Periode"]}
                            addSetting={this.updateState.bind(this)}
                        />

                    </div>

                    <div key="datatable-stops" data-grid={{ x: 0, y: 5, w: 6, h: 3 }}>
                        <Widget
                            component={<DataTable
                                headers={["Nr", "Stadsdeel", "Halte", "Vertraging"]}
                                order={["district", "stop_end"]}
                            />}
                            title="Gemiddelde totale vertraging per halte"
                            componentId="table"
                            settings={[
                                (f) => <Slider onChange={f} min={1} defaultValue={10} marks={{ 10: "10", 20: "20", 30: "30", 40: "40", 50: "50", 60: "60", 70: "70", 80: "80", 90: "90", 100: "100" }} step={null} key='slider3' />,
                                (f) => <Calendar updater={f} />,
                                (f) => <Searchbar updater={f} options={DISTRICTS} multipleOptions={true} placeholderText={"stadsdeel"} key="district" />
                            ]}
                            addSetting={this.updateState.bind(this)}
                            defaultSettings={{
                                "return_filter[]": ["district", "stop_end"],
                                "district[]": DISTRICTS,
                                "transport_type[]": [""],
                                "avg_per": "vehicle_delay",
                                "range": {
                                    "days": 7,
                                    "offset": 0,
                                    "perDay": false
                                },
                                "top": 10
                            }}
                            names={{ 0: "top", 1: "range", 2: "district[]" }}
                            settingsTitles={["Aantal vertragingen Weergeven", "Periode", "Filter op stadsdeel"]}
                        />
                    </div>

                    <div key="datatable-lines" data-grid={{ x: 6, y: 5, w: 6, h: 3 }}>
                        <Widget
                            component={<DataTable
                                headers={["Nr", "Lijn", "Stadsdeel", "Vervoerstype", "Vertraging"]}
                                order={["line_number", "district", "transport_type"]}
                            />}
                            title="Gemiddelde totale vertraging per lijn"
                            componentId="table"
                            settings={[
                                (f) => <Slider onChange={f} min={1} defaultValue={10} marks={{ 10: "10", 20: "20", 30: "30", 40: "40", 50: "50", 60: "60", 70: "70", 80: "80", 90: "90", 100: "100" }} step={null} key='slider3' />,
                                (f) => <Calendar updater={f} />,
                                (f) => <Searchbar updater={f} options={["TRAM", "BUS", "METRO"]} multipleOptions={true} placeholderText={"transporttype"} key="transport-type" />,
                                (f) => <Searchbar updater={f} options={DISTRICTS} multipleOptions={true} placeholderText={"stadsdeel"} key="district" />
                            ]}
                            defaultSettings={{
                                "return_filter[]": ["line_number", "transport_type", "district"],
                                "district[]": DISTRICTS,
                                "transport_type[]": [""],
                                "avg_per": "vehicle_delay",
                                "range": {
                                    "days": 7,
                                    "offset": 0,
                                    "perDay": false
                                },
                                "top": 10
                            }}
                            addSetting={this.updateState.bind(this)}
                            names={{ 0: "top", 1: "range", 2: "transport_type[]", 3: "district[]" }}
                            settingsTitles={["Aantal Vertragingen Weergeven", "Periode", "Filter op transporttype", "Filter op stadsdeel"]}
                        />
                    </div>
                </ResponsiveGridLayout>
            </div>
        )
    }
}

export default Grid
