import React from 'react'
import { Marker, Popup } from 'react-leaflet'
import axios from 'axios';

class MapMarker extends React.Component {
    getMarkers() {
        return axios.get(`https://cors-anywhere.herokuapp.com/http://184.72.120.43:9800/getStops`)
            .then(res => {
                const body = res.data;
                var position = body.map(o => {
                    var x = o[Object.keys(o)[0]];

                    return {
                        lat: x.lat,
                        lon: x.lon,
                        name: x.name
                    }
                })
                return position
            })
    }


    render() {
        return (
            this.getMarkers().then(position => {
                var markers = []
                for (var i = 0; i < position.length; i++) {
                    console.log(position[i])
                    markers.push(
                        <Marker
                            key={`marker-${i}`}
                            position={[position[i].lat, position[i].lon]} >
                            <Popup>
                                <span>
                                    {
                                        position[i].name
                                    }
                                </span>
                            </Popup>
                        </Marker >
                    )
                }
                console.log(markers)
                return markers
            })
        );
    }
}
export default MapMarker;
