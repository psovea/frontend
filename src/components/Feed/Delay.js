import React from 'react';
import socketIOClient from "socket.io-client";

class Delay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      delays: []
    }
  }

  getTravelInfo(info) {
    let reqLine = fetch("https://cors-anywhere.herokuapp.com/" + `http://18.216.203.6:5000/get-lines?operator=${info.dataownercode}&internal_id=${info.lineplanningnumber}`)
    .then(res => res.json())

    var reqStop = fetch("https://cors-anywhere.herokuapp.com/" + `http://18.216.203.6:5000/get-stops?stop_code=300${info.userstopcode}`)
    .then(res => res.json())


    Promise.all([reqStop, reqLine]).then(data => {
      var obj = {...data[1][0], ...data[0][0]}

      this.setState(prevState => {
        let newDelay = {
          publicLine: obj.public_id,
          transportType: obj.transport_type,
          stopName: obj.name,
          operator: obj.operator,
          publicLine: obj.public_id,
          punctuality: info.punctuality
        }

        return { delays: [newDelay, ...prevState.delays] }
      })
    })
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient('http://127.0.0.1:3500');
    socket.on("message", data => {
      let info = JSON.parse(data)
      console.log(info['ARRIVAL']['punctuality'])
      this.getTravelInfo(info['ARRIVAL']);
    });

  }

  render = () => {
    console.log(this.state);
    const {delays} = this.state
    return (
      delays.map(item => {
        return <li key={item} className={"delay"}>
          <p className={"delay-header"}>Lijn {item.publicLine}: {item.name}</p>
          <p>Stop: {item.stopName}</p>
          <p>Transport type: {item.transportType}</p>
          <p>Operator: {item.operator}</p>
          <p>Delay: {item.punctuality} seconden</p>
        </li>
      })
    )
  }
}

export default Delay;
