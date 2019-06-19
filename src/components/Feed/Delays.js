import React from 'react'
import Delay from './Delay'
import PropTypes from 'prop-types'
import './Feed.css'

class Delays extends React.Component {

  render = () => {
    return <Delay />
  }
}

Delays.propTypes = {
  delays: PropTypes.object
}

export default Delays
