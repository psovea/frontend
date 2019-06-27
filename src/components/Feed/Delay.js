/* Delay.js
 * Description:
 * Shows a list of incoming (live) delays. It connects to a socket that sends all incoming
 * delays for the GVB.
 */

import React, { Component } from 'react'
import socketIOClient from "socket.io-client"
import Missing from '../Missing/Missing'

import {toLocalUrl} from '../../helper'

class Delay extends Component {
  constructor(props) {
    super(props)

    this.state = {
      delays: []
    }

    /* static headers and values for each delay, including the width for the html. */
    this.headers = [["Tijd", "col-2"], ["Lijn", "col-2"], ["Vertraging", "col-3"], ["Halte", "col-3"], ["Vervoerder", "col-2"]]
    this.valueKeys = [["time", "col-2"], ["publicLine", "col-2"], ["punctuality", "delay-stream-delay-value col-3"], ["name", "col-3"]]

    this._isMounted = false
  }

  /* Given a stopcode and line id, retrieve the necessary data from the database. */
  getTravelInfo = (info) => {

    let reqLine = fetch(
        toLocalUrl(`http://18.224.29.151:5000/get-lines?operator=${info.dataownercode}&internal_id=${info.lineplanningnumber}`)
      ).then(res => res.json())

    var reqStop = fetch(
        toLocalUrl(`http://18.224.29.151:5000/get-stops?stop_code=300${info.userstopcode}`)
      ).then(res => res.json())

    /* Wait for requests to finish. */
    Promise.all([reqStop, reqLine]).then(data => {

      if (this._isMounted) {
        /* Merge the two objects into one. */
        var obj = {...data[1][0], ...data[0][0]}

        this.setState(prevState => {
          let newDelay = {
            time: this.getTime(),
            publicLine: obj.public_id,
            punctuality: this.formatDelay(info.punctuality),
            name: obj.stop_name ? obj.stop_name : "N/A",
            transportType: obj.transport_type,
          }

          /* Update the delays list. */
          return { delays: [newDelay, ...prevState.delays] }
        })
      }
    })
  }

  componentDidMount = () => {
    this._isMounted = true

    /* Initiate connection with socket. */
    const socket = socketIOClient('http://127.0.0.1:3500')
    socket.on("message", data => {
      let info = JSON.parse(data)
      this.getTravelInfo(info['ARRIVAL'])
    })
  }

  componentWillUnmount = () => {
    this._isMounted = false
  }

  /* Formats the current time as hh:mm. */
  getTime = () => {
    var today = new Date()
    var hh = today.getHours()
    var mm = today.getMinutes()

    return `${hh}:${mm}`
  }

  /* Punctuality is given in seconds, therefore we want to make it more readable.
   * This formats these seconds as such:
   * "x minutes and y seconds"
   */
  formatDelay = (time) => {
    let minutes = Math.floor(time / 60).toString()
    let seconds = (time % 60).toString()

    return (minutes >= 1 ? minutes + " minuten en " : "") + seconds +  " seconden"
  }

  /* Create a header row for a delay item. */
  mkHeader = () => {
    return (
      <div className="delay-stream-item-header row">
        {this.headers.map((tup) => (
          <div key={tup} className={"delay-stream-item-header-line " + tup[1]}>
            <p className="delay-stream-item-header-line-title">{tup[0]}</p>
          </div>
        ))}
      </div>
    )
  }

  /* Show values corresponding to the headers. */
  mkRow = (item) => {
    return (
      <div key={item} className="delay-stream-item-header row">
        {
          /* keyTup consists of values in the form of [value, width]. */
          this.valueKeys.map((keyTup) => (
            <div key={keyTup} className={"delay-stream-item-header-line " + keyTup[1]}>
              <p className="delay-stream-item-header-line-value">{item[keyTup[0]]}</p>
            </div>
          ))
        }
        <div className="delay-stream-item-header-line col-2">
          <p className="delay-stream-item-header-line-image"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/BSicon_LOGO_GVB.svg/500px-BSicon_LOGO_GVB.svg.png"></img></p>
        </div>
      </div>
    )
  }

  render = () => {
    if (this.state.delays.length == 0 || this.state.delays == null) {
      return <Missing customMessage="Nog geen beschikbare data..." />
    }

    return (
      this.state.delays.map((item, index) => (
        <div key={index} className="delay-stream-item" id={index == 0 ? "stream-animate" : "stream"}>
          {this.mkHeader()}
          {this.mkRow(item)}
        </div>
      ))
    )
  }
}

export default Delay
