import React from 'react'
import Delays from './Delays'
import PropTypes from 'prop-types'

import './Feed.css'

class Feed extends React.Component {
  render () {
    return (
      <div className='feed'>
        <Delays />
      </div>
    )
  }
}

export default Feed
