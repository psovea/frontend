import React from 'react';
import Delays from './Delays';
import Loader from './Loader';
import NotificationBar from './NotificationBar'
import { Rewind } from 'react-feather';
import PropTypes from 'prop-types'

import './Feed.css'

class Feed extends React.Component {

  render() {
    return (
      <div className="feed">
        <Delays/>
        <Loader/>
      </div>
    )
  }
}


export default Feed;
