import React from 'react';
import PropTypes from 'prop-types';
// import { SubscribeToMessage } from '../../api/Socket';
import socketIOClient from "socket.io-client";


class Delay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      response: null,
      endpoint: "http://127.0.0.1:3500"
    };

    // SubscribeToMessage((err, message) => this.SetState({
    //   message
    // }))

    // state = {
    //   message: 'None'
    // }
  }

  componentDidMount() {
    const { endpoint } = this.state;
    const socket = socketIOClient(endpoint);

    socket.on("message", data => {
      console.log(data)
      this.setState({ response: data })
    });
  }

  render = () => {
    // var delay = this.props.delay;

    console.log(this.state.message);
    const {response} = this.state

    return (
      <li>{response}</li>
    )
  }
}

// Delay.propTypes = {
//   delay: PropTypes.number
// }

export default Delay;
