/* Map.js:
 * Discription: This file uses react-leaflet to show a map of Amsterdam (The Netherlands).
 *              Boundaries of the map can be changed here.
 *              The map also uses an API to show a Heatmap of traffic delay.
 */

import React from 'react'
import { Map, TileLayer, Marker, Tooltip } from 'react-leaflet'

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
            currentSettings: { line_number: [""] }
        }
    }

    fetchData() {
        /* Create uri for retrieving a line number */
        let createUri = state => "&internal_id=" + (state
            .filter(R.compose(R.not, R.empty))
            .map(lineNum => lineNum.match(/([0-9]*):.*/i)[1]) // extract line number
            .join(','))

        let lineNumUri =
            /* Check if any of the line numbers are empty or undefined */
            !R.any(R.isEmpty, this.state.currentSettings["line_number[]"]) && !R.isEmpty(this.state.currentSettings["line_number[]"])
                /* Create uri for line number */
                ? createUri(this.state.currentSettings["line_number[]"])
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

        // Find all corresponding stops in the fetched line and stop data.
        let find = (obj, stops) => R.find(R.propEq('stop_code', obj.stop_code), stops)

        // Filter all stops with the find function and set the state.
        Promise.all(promises).then(values => {
            return values[1].flat().map(x => find(x, values[0])).filter(x => x)
        }).then(stops => {
            return this.setState({ stops: stops })
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
                </Map>
            )
        } else {
            return <Missing />
        }
    }
}

export default Maps
