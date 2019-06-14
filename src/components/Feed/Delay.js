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
      delays.map(item => {
        return <VerticalTimelineElement
          key={item}
          className="vertical-timeline-element--work"
          date={this.getDate()}
          icon={<GVBIcon />}
          iconStyle={{ background: 'white' }}
        >
          <h3 className="vertical-timeline-element-title">Lijn {item.publicLine}</h3>
          <h4 className="vertical-timeline-element-subtitle">{item.punctuality} seconden vertraagd</h4>
          <p>
            Halte: {item.stopName}
          </p>
        </VerticalTimelineElement>
        // return <li key={item} className={"delay"}>
        //   <p>Transport type: {item.transportType}</p>
        //   <p className={"delay-header"}></p>
        //   <p>Stop: {item.stopName}</p>
        //   <p>Operator: {item.operator}</p>
        //   <p>Delay: {item.punctuality} seconden</p>
        // </li>
      })
    )
  }
}

export default Delay;
