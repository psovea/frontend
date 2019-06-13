import React from 'react';
import PropTypes from 'prop-types';

class Delay extends React.Component {
  render = () => {
    // var delay = this.props.delay;

    return (
      <li className={"delay"}>
        <p>Test</p>
      </li>
    )
  }
}

// Delay.propTypes = {
//   delay: PropTypes.number
// }

export default Delay;
