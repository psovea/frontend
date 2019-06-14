import React from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import HeatmapLayer from 'react-leaflet-heatmap-layer'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import 'react-leaflet-markercluster/dist/styles.min.css';

// Imports for redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
    };

    shouldComponentUpdate(nextProps, nextState) {
        console.log("in componentShouldUpdate")
        nextState.districts = nextProps.districts;
        console.log("new state in maps")
        console.log(nextState.districts)
        return true;
    }

    createMarkers() {
        return this.state.stops.map((stop, i) => {
            return <Marker
                key={`marker-${i}`}
                position={[stop.lat, stop.lon]} >
                <Popup> {[stop.name]} </Popup>
            </Marker >
        })
    }

    fetchJSON(url, value) {
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

    componentDidMount() {
        // Stop data
        this.fetchJSON(`http://18.216.203.6:5000/get-stops`, "stops")
        // District data
        this.fetchJSON(`http://184.72.120.43:3000/districts`, "districts")
        // Heatmap data
        this.fetchJSON('http://18.216.203.6:5000/get-heatmap-info', 'heatmapdata')
        // Delay data
        // this.fetchJSON(`http://myurl.url`, "delays")
    }

    createMarkers() {
        return this.state.stops.map((stop, i) => {
            return <Marker
                key={`marker-${i}`}
                position={[stop.lat, stop.lon]} >
                <Popup> {[stop.name]} </Popup>
            </Marker >
        })
    }

    render() {
        return (
            <div className="dashboard-widget">
                <div className="dashboard-widget-header">
                    <p className="dashboard-widget-header-title">Kaart</p>
                </div>
                <div className="dashboard-widget-content" id="map">
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
                {/* <GeoJSON
                    data={this.state.districts}
                /> */}
            </Map >
                </div>
            </div>
        );
    }
}

Maps.propTypes = {
    districts: PropTypes.array,
};

const mapStateToProps = state => {
    console.log("mappingStateToProps")
    return { 
        districts: state.districts
    }
}

export default connect(mapStateToProps, null)(Maps);
