/* Map.js:
 * Discription: This file uses react-leaflet to show a map of Amsterdam (The Netherlands).
 *              Bounderies of the map can be changed here.
 *              The map also uses an API to show a Heatmap of traffic delay.
 */

import React from 'react'
import { Map, TileLayer, Marker, Tooltip } from 'react-leaflet'

import HeatmapLayer from 'react-leaflet-heatmap-layer'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import 'react-leaflet-markercluster/dist/styles.min.css';

class Maps extends React.Component {
    constructor() {
        super();
        this.state = {
            bounds: [
                [52.218546, 4.589539],
                [52.471907, 5.178680]
            ],
            center: [52.3680, 4.9036],
            zoom: 13,
            stops: [],
            districts: [],
            delays: [],
            heatmapdata: []

        }
    }

    update(newState) {
        this.setState(newState)
    }

    fetchJSON(url, value) {
        // Hacky (wrong) way of handling CORS.
        url = 'https://cors-anywhere.herokuapp.com/' + url
        let jsonVar = {}
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => {
            return res.json();
        }).then(json => {
            jsonVar[value] = json;
            this.setState(jsonVar);
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        // If pre-update state is equal to post-update state, do not rerender.
        return this.state != nextState
    }

    componentDidMount() {
        // Stop data
        this.fetchJSON(`http://18.224.29.151:5000/get-stops?town=amsterdam`, "stops")
        // District data
        this.fetchJSON(`http://184.72.120.43:3000/districts`, "districts")
        // Heatmap data
        this.fetchJSON('http://18.224.29.151:5000/get-heatmap-info', 'heatmapdata')
        // Delay data
        // this.fetchJSON(`http://myurl.url`, "delays")
    }

    createMarkers() {
        return this.state.stops.map((stop, i) => {
            return (
                <Marker
                    key={`marker-${i}`}
                    position={[stop.lat, stop.lon]} >
                    <Tooltip>
                        {[stop.name]}
                    </Tooltip>
                </Marker >
            )
        })
    }

    update(newState) {
        this.setState(newState)
    }

    render() {
        return (
            <Map
                ref={(ref) => { this.map = ref; }}
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
                    attribution='&copy; PSOVEA'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                <MarkerClusterGroup
                    spiderLegPolylineOptions={{
                        weight: 0,
                        opacity: 0,
                    }}>
                    {this.createMarkers()}
                </MarkerClusterGroup>
            </Map>
        )
    }
}

export default Maps;
