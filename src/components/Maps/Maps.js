import React from 'react'
import { Map, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'
import HeatmapLayer from 'react-leaflet-heatmap-layer'
import { addressPoints } from './DummyHeatmap'

class Maps extends React.Component {
    constructor() {
        super();
        this.state = {
            bounds: [[52.462449, 4.738163], [52.290331, 5.135141]],
            center: [52.3680, 4.9036],
            zoom: 13,
            stops: [],
            districts: []
        }
    };

    createMarkers() {
        let markers = []
        let stops = this.state.stops
        for (let i = 0; i < stops.length; i++) {
            let element = stops[i][Object.keys(stops[i])[0]]
            let position = [element.lat, element.lon]
            markers.push(
                <Marker
                    key={`marker-${i}`}
                    position={position} >
                    <Popup> {element.name} </Popup>
                </Marker >
            )
        }
        return markers
    }

    componentDidMount() {
        fetch(`https://cors-anywhere.herokuapp.com/http://184.72.120.43:9800/getStops`)
            .then(res => res.json())
            .then(json => this.setState({ stops: json }))
        fetch(`https://cors-anywhere.herokuapp.com/http://145.109.9.102:5000/get-districts`)
            .then(res => res.json())
            .then(json => this.setState({ districts: json }))
    }

    render() {
        console.log(this.state.stops)
        console.log(this.state.districts)
        return (
            <Map
                ref={(ref) => { this.map = ref; }}
                center={this.state.center}
                zoom={this.state.zoom}
                bounds={this.state.bounds}
                maxBounds={this.state.bounds}
                boundsOptions={{ padding: [50, 50] }}
                maxZoom={15}
                minZoom={11}
            >
                <HeatmapLayer
                    fitBoundsOnLoad
                    fitBoundsOnUpdate
                    points={addressPoints}
                    longitudeExtractor={m => m[1]}
                    latitudeExtractor={m => m[0]}
                    intensityExtractor={m => parseFloat(m[2])}
                />
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                {this.createMarkers()}
                <GeoJSON data={this.state.districts} />
                </Map >
        );
    }
}
export default Maps;
