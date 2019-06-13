import React from 'react';
import PropTypes from 'prop-types';
import { RefreshCcw } from 'react-feather';

import './Feed.css'

class NotificationBar extends React.Component {
  render = () => {
    // var count = this.props.count;
    var count = 2

    return (
      <div className={"notification-bar" + (count > 0 ? ' active' : '')}>
        <span id="count">Er zijn {count} nieuwe vertragingen</span><span id="refresh-btn"><a href="#top"><button className="button icon-only"><RefreshCcw /></button></a></span>
      </div>
    )
  }
}

// NotificationBar.propTypes = {
//   count: PropTypes.number,
//   onShowNextDelays: PropTypes.func
// }

export default NotificationBar;
