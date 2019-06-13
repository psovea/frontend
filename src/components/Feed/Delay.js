import React from 'react';

class Delay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      publicLine: '0',
      name: '-',
      transportType: '-',
      operator: '-',
      stopName: '-',
      punctuality: 0,
      timestamp: 0
    }
  }

  getTravelInfo(info) {
    var newState = {
      publicLine: '0',
      name: '-',
      transportType: '-',
      operator: info.dataownercode,
      stopName: '-',
      punctuality: info.punctuality,
      timestamp: info.timestamp
    }

    fetch("https://cors-anywhere.herokuapp.com/" + `http://18.216.203.6:5000/get-stops?stop_code=300${info.userstopcode}`)
    .then(res => res.json())
    .then(res => {
      console.log(res[0].name)
      this.setState({stopName: res[0].name});
    })

    fetch("https://cors-anywhere.herokuapp.com/" + `http://18.216.203.6:5000/get-lines?operator=${info.dataownercode}&internal_id=${info.lineplanningnumber}`)
    .then(res => res.json())
    .then(res => {
      this.setState({
        publicLine: res[0].public_id,
        transportType: res[0].transport_type,
        name: res[0].name,
        operator: res[0].operator
      })
    })

    console.log(newState);
  }

  componentDidMount() {
    var info = {
      dataownercode: 'GVB',
      lineplanningnumber: '66',
      operatingday: '2019-06-13',
      journeynumber: '303',
      reinforcementnumber: '0',
      userstopcode: '08299',
      passagesequencenumber: '0',
      timestamp: '2019-06-13T17:21:16.4937073+02:00',
      source: 'SERVER',
      vehiclenumber: '1130',
      punctuality: '96'
    }

    this.getTravelInfo(info);
  }

  render = () => {
    console.log(this.state);
    return (
      <li className={"delay"}>
        <p className={"delay-header"}>Lijn {this.state.publicLine}: {this.state.stopName}</p>
        <p>Halte: {this.state.stopName}</p>
        <p>Transport type: {this.state.transportType}</p>
        <p>Vervoerder: {this.state.operator}</p>
        <p>Vertraging: {this.state.punctuality} seconden</p>

      </li>
    )
  }
}

export default Delay;
