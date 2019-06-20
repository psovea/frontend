import React, { Component } from 'react'
import Delays from './Delays'
import PropTypes from 'prop-types'

import './Feed.css'

class Feed extends Component {
  render () {
    return (
      <div className='feed'>
        <Delays />
      </div>
    )
  }
}

export default Feed
