import React from 'react'

import { Map, TileLayer, Marker, Popup } from 'react-leaflet'


class Maps extends React.Component {
    constructor() {
        super();
        this.state = {
            bounds: [[52.462449, 4.738163], [52.290331, 5.135141]],
            center: [52.3680, 4.9036],
            initZoom: 13,
            markers: [[51.505, -0.09]]
        }
    };

    addMarker = (e) => {
        const { markers } = this.state
        markers.push(e.latlng)
        this.setState({ markers })
    }

    render() {
        return (
            <Map
                center={this.state.center}
                zoom={this.state.initZoom}
                bounds={this.state.bounds}
                maxBounds={this.state.bounds}
                boundsOptions={{ padding: [50, 50] }}
                maxZoom={15}
                minZoom={11}
                onClick={this.addMarker}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                />
                {
                    this.state.markers.map((position, idx) =>
                        <Marker
                            key={`marker-${idx}`}
                            position={position}>
                            <Popup>
                                <span>
                                    Transport data here
                                </span>
                            </Popup>
                        </Marker>
                    )
                }
            </Map >
        );
    }
}
export default Maps;
