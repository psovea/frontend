import React from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import HeatmapLayer from 'react-leaflet-heatmap-layer'
import { addressPoints } from './DummyHeatmap'

class Maps extends React.Component {
    constructor() {
        super();
        this.state = {
            bounds: [[52.462449, 4.738163], [52.290331, 5.135141]],
            center: [52.3680, 4.9036],
            initZoom: 13,
            data: []
        }
    };

    createMarkers() {
        let markers = []
        let data = this.state.data
        for (let i = 0; i < data.length; i++) {
            let element = data[i][Object.keys(data[i])[0]]
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
            .then(json => this.setState({ data: json }));
    }

    render() {
        return (
            <Map
                ref={(ref) => { this.map = ref; }}
                center={this.state.center}
                zoom={this.state.initZoom}
                bounds={this.state.bounds}
                maxBounds={this.state.bounds}
                boundsOptions={{ padding: [50, 50] }}
                maxZoom={15}
                minZoom={11}
            // onzoomend={(e) => { console.log(e); }}
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
            </Map >
        );
    }
}
export default Maps;
