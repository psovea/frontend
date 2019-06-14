import React from 'react';
import socketIOClient from "socket.io-client";
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import GVBIcon from '../Icons/GVBIcon'
import 'react-vertical-timeline-component/style.min.css';

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

  getDate() {
    var today = new Date();
    var dd = today.getDate();

    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();
    var h = today.getHours();
    var m = today.getMinutes();

    return `${dd}-${mm}-${yyyy} ${h}:${m}`
  }

  render = () => {
    console.log(this.state);
    const {delays} = this.state
    return (
      delays.map((item, index) => {
        return <div key={item} className="delay-stream-item" id={index == 0 ? "stream-animate" : "stream"}>
          <div className="delay-stream-item-header row">
            <div className="delay-stream-item-header-line col-3">
              <p className="delay-stream-item-header-line-title">Lijn</p>
            </div>
            <div className="delay-stream-item-header-line col-3">
              <p className="delay-stream-item-header-line-title">Vertraging</p>
            </div>
            <div className="delay-stream-item-header-line col-3">
              <p className="delay-stream-item-header-line-title">Halte</p>
            </div>
            <div className="delay-stream-item-header-line col-3">
              <p className="delay-stream-item-header-line-title">Vervoerder</p>
            </div>
          </div>
          
          <div className="delay-stream-item-header row">
            <div className="delay-stream-item-header-line col-3">
              <p className="delay-stream-item-header-line-value">{item.publicLine}</p>
            </div>
            <div className="delay-stream-item-header-line col-3">
              <p className="delay-stream-item-header-line-value delay-stream-delay-value">{item.punctuality} seconden</p>
            </div>
            <div className="delay-stream-item-header-line col-3">
              <p className="delay-stream-item-header-line-value">{item.stopName}</p>
            </div>
            <div className="delay-stream-item-header-line col-3">
              <p className="delay-stream-item-header-line-image"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/BSicon_LOGO_GVB.svg/500px-BSicon_LOGO_GVB.svg.png"></img></p>
            </div>
          </div>
        </div>
      })
    )
  }
}

export default Delay;
