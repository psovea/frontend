import React from 'react';
import PropTypes from 'prop-types';
import { SubscribeToMessage } from '../../api/Socket';

class Delay extends React.Component {
  constructor(props) {
    super(props);

    SubscribeToMessage((err, message) => this.SetState({
      message
    }))

    state = {
      message: 'None'
    }
  }

  render = () => {
    // var delay = this.props.delay;

    console.log(this.state.message);
    return (
      <li className={"delay"}>
        <p>Message: {this.state.timestamp}</p>
      </li>
    )
  }
}

// Delay.propTypes = {
//   delay: PropTypes.number
// }

export default Delay;
