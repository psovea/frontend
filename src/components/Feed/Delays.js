import React from 'react';
import Delay from './Delay';
import PropTypes from 'prop-types';

import './Feed.css'

class Delays extends React.Component {

  render = () => {

    return (
      <div className="dashboard-widget">
        <div className="dashboard-widget-header row">
          <div className="dashboard-widget-header-title-wrapper col-8">
              <p className="dashboard-widget-header-title">Binnenkomende Vetragingen</p>
          </div>

          <div className="dashboard-widget-header-settings-wrapper col-4">
              <i className="fa fa-sliders dashboard-widget-header-settings-wrapper-icon" aria-hidden="true"></i>
          </div>
        </div>
        <div className="dashboard-widget-content" id="map">
          <div className="delay-stream">
            <Delay />
          </div>
        </div>
      </div>
    )
  }
}

Delays.propTypes = {
  delays: PropTypes.object
}

export default Delays;
