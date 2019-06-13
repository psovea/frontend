import React from 'react';
import Delay from './Delay';
import PropTypes from 'prop-types';


import './Feed.css'

class Delays extends React.Component {

  render = () => {

    return (
      <ul className="delays">
        <Delay />
      </ul>
    )
  }
}

Delays.propTypes = {
  delays: PropTypes.object
}

export default Delays;
