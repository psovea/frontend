/* Map.js:
 * Discription: This file uses react-leaflet to show a map of Amsterdam (The Netherlands).
 *              Boundaries of the map can be changed here.
 *              The map also uses an API to show a Heatmap of traffic delay.
 */

import React from 'react'
import { Map, TileLayer, Marker, Tooltip, Polyline } from 'react-leaflet'

import * as R from 'ramda'

import HeatmapLayer from 'react-leaflet-heatmap-layer'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import 'react-leaflet-markercluster/dist/styles.min.css'
import Missing from '../Missing/Missing'
import Control from 'react-leaflet-control'
import legenda from './heatmap-legenda.png'

class Maps extends React.Component {
    constructor() {
        super()
        this.state = {
            bounds: [
                [52.218546, 4.589539],
                [52.471907, 5.178680]
            ],
            center: [52.3680, 4.9036],
            zoom: 13,
            stops: [],
            lines: [],
            delays: [],
            heatmapdata: [],
            currentSettings: { line_number: [""] },
            lines: {}
        }
    }

    /* Find all stops that have certain value */
    find = (obj, stops, prop) => R.find(R.propEq(prop, obj[prop]), stops)

    /* Filter invalid stops, which always default to a certain position */
    isInvalidStop = (stop) => (parseFloat(stop.lat) == 47.974766 || parseFloat(stop.lon) == 3.3135424)

    /* Create [lat, lon] pairs between the stops for each line we want to filter. */
    getLines(values) {
        let groupedByLine = R.groupBy(R.prop('internal_id'), values[1].flat())

        return R.mergeAll(Object.keys(groupedByLine).map(line => (
                {[line]: { color: this.getRandomColor(),
                           coords: groupedByLine[line]
                            .map(stop => this.find(stop, values[0], 'stop_code'))
                            .filter(x => x)
                            .map(stop => this.isInvalidStop(stop)
                                    ? null
                                    : [parseFloat(stop.lat), parseFloat(stop.lon)])
                            .filter(x => x)
                          }
                })))
    }

    /* Retrieve the stops for a certain line number */
    getStops = (values) => values[1].flat()
                                    .map(x => this.find(x, values[0], 'stop_code'))
                                    .filter(x => x)

    /* Create uri for retrieving a line number */
    createUri = state => "&internal_id=" + (state
                      .filter(R.compose(R.not, R.empty))
                      .map(lineNum => lineNum.match(/([0-9]*):.*/i)[1]) // extract line number
                      .join(','))

    fetchData() {
        var lineNumUri =
            /* Check if any of the line numbers are empty or undefined */
            !R.any(R.isEmpty, this.state.currentSettings["line_number[]"]) &&
            !R.isEmpty(this.state.currentSettings["line_number[]"])
                /* Create uri for line number */
                ? this.createUri(this.state.currentSettings["line_number[]"])
                /* Or empty string */
                : ""

        let urls = [
            'https://cors-anywhere.herokuapp.com/http://18.224.29.151:5000/get-stops?town=amsterdam',
            `https://cors-anywhere.herokuapp.com/http://18.224.29.151:5000/get-line-info?operator=GVB${lineNumUri}`
        ]

        let promises = urls.map(url => {
            return fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }).then(res => {
                return res.json()
            })
        })

        // Filter all stops with the find function and set the state.
        Promise.all(promises).then(values => {
            let stops = this.getStops(values)
            let lines = lineNumUri != "" ? this.getLines(values) : {}

            return [stops, lines]
        }).then(data => {
            return this.setState({ stops: data[0], lines: data[1] })
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        // If pre-update state is equal to post-update state, do not rerender.
        return this.state != nextState
    }

    update(newData, newSettings) {
        // Update function called by Widget.js to communicate between the components.
        if (newData) {
            this.setState({ heatmapdata: newData[0], currentSettings: newSettings }, () => this.fetchData())
        }
    }

    createMarkers() {
        // Create markers by mapping each stop coordinate and name to a marker component.
        return this.state.stops.map((stop, i) => {
            return (
                <Marker
                    key={`marker-${i}`}
                    position={[stop.lat, stop.lon]} >
                    <Tooltip>
                        {[stop.stop_name]}
                    </Tooltip>
                </Marker >
            )
        })
    }

    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }


    createLines() {
        return Object.keys(this.state.lines).map(line => {
            let lineObj = this.state.lines[line]
            return <Polyline key={line} color={lineObj.color} positions={lineObj.coords} />
        })
    }

    createLineLegend() {
        return <div className="line-legend-container">
                {Object.keys(this.state.lines).map(line => {
                    let lineObj = this.state.lines[line]
                    return <div key={line} className="row line-legend-row">
                                <div className="col-3 line-legend-color" style={{backgroundColor: lineObj.color}}></div>
                                <div className="col-9 line-legend-text"><p>Lijn: {line}</p></div>
                            </div>
                })}
                </div>
    }

    renderLineLegend() {
        return (this.state.lines != []) ? <Control position="topright" >{this.createLineLegend()}</Control>
                                        : null
    }

    render() {
        if (this.state.heatmapdata.length != 0) {
            return (
                <Map
                    ref={(ref) => { this.map = ref }}
                    center={this.state.center}
                    zoom={this.state.zoom}
                    bounds={this.state.bounds}
                    maxBounds={this.state.bounds}
                    boundsOptions={{ padding: [50, 50] }}
                    maxZoom={16}
                    minZoom={11}
                >
                    {this.createLines()}

                    <HeatmapLayer
                        fitBoundsOnLoad
                        fitBoundsOnUpdate
                        points={this.state.heatmapdata}
                        longitudeExtractor={m => m[1]}
                        latitudeExtractor={m => m[0]}
                        intensityExtractor={m => parseFloat(m[2])}
                    />
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url='https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.png'
                    />
                    <MarkerClusterGroup
                        spiderLegPolylineOptions={{
                            weight: 0,
                            opacity: 0,
                        }}>
                        {this.createMarkers()}
                    </MarkerClusterGroup>
                    <Control position="topleft" >
                        <img src={legenda} height="300px" />
                    </Control>

                    {this.renderLineLegend()}
                </Map>
            )
        } else {
            return <Missing />
        }
    }
}

export default Maps
