import React from 'react'
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'
import HeatmapLayer from 'react-leaflet-heatmap-layer'
import { addressPoints } from './DummyHeatmap'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import 'react-leaflet-markercluster/dist/styles.min.css';

// Imports for redux
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Maps extends React.Component {
    constructor() {
        super();
        this.state = {
            bounds: [[52.462449, 4.738163], [52.290331, 5.135141]],
            center: [52.3680, 4.9036],
            zoom: 13,
            stops: [],
            districts: [],
        }
    };

    shouldComponentUpdate(nextProps, nextState) {
        console.log("in componentShoudlUpdate")
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
        console.log(url, value)
        let jsonVar = {}
        fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then(res => {
                return res.json();
            })
            .then(json => {
                jsonVar[value] = json;
                console.log(jsonVar);
                this.setState(jsonVar);
            })
    }

    componentDidMount() {
        this.fetchJSON(`https://cors-anywhere.herokuapp.com/http://18.216.203.6:5000/get-stops`, "stops")
        // this.fetchJSON(`https://cors-anywhere.herokuapp.com/http://184.72.120.43:3000/districts`, "districts")
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
                {/* <HeatmapLayer
                    fitBoundsOnLoad
                    fitBoundsOnUpdate
                    points={addressPoints}
                    longitudeExtractor={m => m[1]}
                    latitudeExtractor={m => m[0]}
                    intensityExtractor={m => parseFloat(m[2])}
                /> */}
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
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
        );
    }
}

Maps.propTypes = {
    districts: PropTypes.array,
};

const mapStateToProps = state => {
    console.log("noticed store changed")
    console.log(state.districts)
    return { 
        districts: state.districts
    }
}

export default connect(mapStateToProps, null)(Maps);
