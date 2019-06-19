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
    let reqLine = fetch("https://cors-anywhere.herokuapp.com/" + `http://18.224.29.151:5000/get-lines?operator=${info.dataownercode}&internal_id=${info.lineplanningnumber}`)
    .then(res => res.json())

    var reqStop = fetch("https://cors-anywhere.herokuapp.com/" + `http://18.224.29.151:5000/get-stops?stop_code=300${info.userstopcode}`)
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
    const socket = socketIOClient('http://127.0.0.1:3500');
    socket.on("message", data => {
      let info = JSON.parse(data)
      this.getTravelInfo(info['ARRIVAL']);
    });
  }

  getDate() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();

    return `${h}:${m}`
  }

  formatDelay(item) {
    let minutes = Math.floor(item.punctuality / 60).toString()
    let seconds = (item.punctuality % 60).toString()

    return (minutes >= 1 ? minutes + " minuten en " : "") + seconds +  " seconden"
  }

  render = () => {
    const {delays} = this.state
    return (
      delays.map((item, index) => {
        return <div key={index} className="delay-stream-item" id={index == 0 ? "stream-animate" : "stream"}>
          <div className="delay-stream-item-header row">
            <div className="delay-stream-item-header-line col-2">
              <p className="delay-stream-item-header-line-title">Tijd</p>
            </div>
            <div className="delay-stream-item-header-line col-2">
              <p className="delay-stream-item-header-line-title">Lijn</p>
            </div>
            <div className="delay-stream-item-header-line col-3">
              <p className="delay-stream-item-header-line-title">Vertraging</p>
            </div>
            <div className="delay-stream-item-header-line col-3">
              <p className="delay-stream-item-header-line-title">Halte</p>
            </div>
            <div className="delay-stream-item-header-line col-2">
              <p className="delay-stream-item-header-line-title">Vervoerder</p>
            </div>
          </div>
          <div className="delay-stream-item-header row">
            <div className="delay-stream-item-header-line col-2">
              <p className="delay-stream-item-header-line-value">{this.getDate()}</p>
            </div>
            <div className="delay-stream-item-header-line col-2">
              <p className="delay-stream-item-header-line-value">{item.publicLine}</p>
            </div>
            <div className="delay-stream-item-header-line col-3">
              <p className="delay-stream-item-header-line-value delay-stream-delay-value">{this.formatDelay(item)}</p>
            </div>
            <div className="delay-stream-item-header-line col-3">
              <p className="delay-stream-item-header-line-value">{item.stopName ? item.stopName : "N/A"}</p>
            </div>
            <div className="delay-stream-item-header-line col-2">
              <p className="delay-stream-item-header-line-image"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/BSicon_LOGO_GVB.svg/500px-BSicon_LOGO_GVB.svg.png"></img></p>
            </div>
          </div>
        </div>
      })
    )
  }
}

export default Delay;
