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
import "./Grid.css"
import 'rc-slider'
import 'rc-slider/assets/index.css'
import Searchbar from "../Searchbar/Searchbar";

const ResponsiveGridLayout = WidthProvider(Responsive)


// This defines the grid; here we add other components (lets call
// them widgets). Unfortunately we have to add div's directly into
// the ResponiveGridLayout, in these divs we can put our widgets.
// I have not found a way to work around this yet.
class Grid extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

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
                >
                    <div key="barchart1" data-grid={{ x: 0, y: 0, w: 3, h: 2 }}>
                        <Widget
                            component={<BarChart />}
                            title="Vertraging per dag"
                            componentId="bar"
                            settings={[
                                (f) => <Slider onChange={f} min={86400} max={604800} defaultValue={86400} 
                                               marks={{ 86400: "1 dag", 172800: "2 dagen", 259200: "3 dagen", 345600: "4 dagen", 432000: "5 dagen", 518400: "6 dagen", 604800: "7 dagen"}}
                                               step={null} key='slider'/>,

                                (f) => <Searchbar updater={f} options={["Bus", "Tram", "Metro", "Boot"]} multipleOptions={true} placeholderText={"vervoerstype"} key='searchTransport'
                                />,

                                (f) => <Searchbar updater={f} endpoint={"get-lines"} params={this.state.bar1} multipleOptions={false} placeholderText={"lijn"} key='searchLine' filterFunc={(item) => `${item.public_id}: ${item.line_name}`}
                                />
                            ]}
                            defaultSettings={{
                                "return_filter[]": ["district"],
                                "transport_type[]": "",
                                "period": 86400}}
                            names={{ 0: "period" }}
                            addSetting={this.updateState.bind(this)}
                            settingsTitles={["Periode", "Vervoersmiddel", "Lijn"]}
                        />   
                    </div>

                    <div key="barchart2" data-grid={{ x: 3, y: 0, w: 3, h: 2 }}>
                        <Widget
                            component={<DoughnutChart metric="district" colors={['#ff6666', '#ff4d4d', '#ff3333', '#ff1a1a', '#ff0000', '#e60000', '#cc0000', '#b30000']} />}
                            title="Vertraging per stadsdeel"
                            componentId="bar"
                            settings={[
                                (f) => <Slider onChange={f} min={20} defaultValue={20} marks={{ 20: "1 week", 40: "3 weken", 60: "5 week", 100: "10 weken" }} step={null} key='slider1' />
                            ]}
                            names={{ 0: "dagen", 1: "weken" }}
                            defaultSettings={{
                                "return_filter[]": ["district"],
                                "district[]": ["Centrum","Nieuw-West","Zuidoost","Noord","Oost","West","Westpoort","Zuid"],
                                "transport_type[]": "",
                                "period": 86400,
                                "top": 8}}
                            settingsTitles={["Periode"]}
                        />
                    </div>

                    <div key="map" data-grid={{ x: 6, y: 0, w: 6, h: 3 }}>
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
                            settingsTitles={["Periode"]}
                            defaultSettings={{
                                "return_filter[]": ["stop_end"],
                                "transport_type[]": "",
                                "district[]": ["Centrum","Nieuw-West","Zuidoost","Noord","Oost","West","Westpoort","Zuid"],
                                "format": "heatmap",
                                "period": 86400,
                                "top": 8}}
                        />
                    </div>

                    <div key="feed" data-grid={{ x: 0, y: 3, w: 6, h: 3 }}>
                        <Widget
                            component={<Delays />}
                            title="Live vertraging"
                            componentId="feed"
                            settings={[(f) => <Slider onChange={f} min={20} defaultValue={20} marks={{ 20: "1 dag", 40: "3 dagen", 60: "1 week", 100: "2 weken" }} step={null} key='slider' />]}
                            names={{ 0: "dagen" }}
                            settingsTitles={["Periode"]}
                        />
                    </div>

                    <div key="barchart4" data-grid={{ x: 6, y: 3, w: 3, h: 2 }}>
                        <Widget
                            component={<DoughnutChart metric="transport_type" colors={['#ff6666', '#ff4d4d', '#ff3333', '#ff1a1a', '#ff0000']} />}
                            title="Vertraging per voertuig"
                            componentId="bar"
                            settings={[(f) => <Slider onChange={f} min={20} defaultValue={20} marks={{ 20: "1 dag", 40: "3 dagen", 60: "1 week", 100: "2 weken" }} step={null} key='slider4' />]}
                            names={{ 0: "dagen", 1: "weken" }}
                            defaultSettings={{
                                "return_filter[]": ["transport_type"],
                                "transport_type[]": "",
                                "period": 86400,
                                "top": 8}}
                            settingsTitles={["Periode"]}
                        />

                    </div>

                    <div key="datatable1" data-grid={{ x: 9, y: 4, w: 3, h: 3 }}>
                        <Widget
                            component={<DataTable
                                headers={["nr", "stadsdeel", "stop", "vervoerstype", "vertraging"]}
                                values={[]}
                                top={10}
                            />}
                            title="Top vertragingen per halte"
                            componentId="table"
                            settings={[
                              (f) => <Slider onChange={f} min={1} defaultValue={10} marks={{ 10: "10", 20: "20", 30: "30", 40: "40", 50: "50", 60: "60", 70: "70", 80: "80", 90: "90" }} step={null} key='slider3' />,
                            ]}
                            defaultSettings={{
                                "return_filter[]": ["district", "transport_type", "stop_end"],
                                "transport_type[]": "",
                                "period": 86400,
                                "top": 10}}
                            names={{ 0: "top" }}
                            settingsTitles={["Aantal topvertragingen"]}
                        />
                    </div>

                    <div key="datatable2" data-grid={{ x: 0, y: 5, w: 3, h: 3 }}>
                        <Widget
                            component={<DataTable
                                headers={["nr", "stadsdeel", "stop", "vervoerstype", "vertraging"]}
                                values={[]}
                                top={10}
                            />}
                            title="Top vertragingen per halte"
                            componentId="table"
                            settings={[
                              (f) => <Slider onChange={f} min={1} defaultValue={10} marks={{ 10: "10", 20: "20", 30: "30", 40: "40", 50: "50", 60: "60", 70: "70", 80: "80", 90: "90" }} step={null} key='slider3' />,
                            ]}
                            defaultSettings={{
                                "return_filter[]": ["line_number", "transport_type", "stop_end"],
                                "transport_type[]": "",
                                "period": 86400,
                                "top": 10}}
                            names={{ 0: "top" }}
                            settingsTitles={["Aantal topvertragingen"]}
                        />
                    </div>

                    <div key="datatable3" data-grid={{ x: 3, y: 5, w: 4, h: 3 }}>
                        <Widget
                            component={<DataTable
                                headers={["Nr", "Stadsdeel", "Lijn Nr", "vervoerstype", "Vertraging"]}
                                values={[]}
                                top={10}
                            />}
                            title="Vertraging per Stadsdeel"
                            componentId="table"
                            settings={[
                              (f) => <Slider onChange={f} min={1} defaultValue={10} marks={{ 10: "10", 20: "20", 30: "30", 40: "40", 50: "50", 60: "60", 70: "70", 80: "80", 90: "90" }} step={null} key='slider3' />,
                              (f) => <Searchbar updater={f} options={["Centrum", "Noord", "Zuid", "West", "Westpoort", "Nieuw-West", "Zuidoost", "Oost"]} multipleOptions={false} placeholderText={"stadsdeel"} key='searchDistrict'/>
                            ]}
                            defaultSettings={{
                                "return_filter[]": ["line_number", "district", "transport_type"],
                                "transport_type[]": "",
                                "district[]": ["Centrum"],
                                "period": 86400,
                                "top": 25}}
                            names={{ 0: "top", 1: "district[]" }}
                            addSetting={this.updateState.bind(this)}
                            settingsTitles={["Aantal top vertragingen"], ["Zoeken op stadsdeel"]}
                        />
                    </div>


                </ResponsiveGridLayout>
            </div>
        )
    }
}

export default Grid
