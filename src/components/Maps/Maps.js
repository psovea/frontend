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
import Missing from '../Missing/Missing';
import Control from 'react-leaflet-control';
import legenda from './heatmap-legenda.png'

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
            delays: [],
            heatmapdata: []

        }
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

    update(newData) {
        if (newData) {
            this.setState({ heatmapdata: newData[0] });
        }
    }

    componentDidMount() {
        this.fetchJSON(`http://18.224.29.151:5000/get-stops?town=amsterdam`, "stops")
    }

    createMarkers() {
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

export default Maps;
