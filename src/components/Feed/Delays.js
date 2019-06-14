import React from 'react';
import Delay from './Delay';
import PropTypes from 'prop-types';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';



import './Feed.css'

class Delays extends React.Component {

  render = () => {

    return (
      // <ul className="delays">
      <div className="dashboard-widget">
        <div className="dashboard-widget-header">
            <p className="dashboard-widget-header-title">Kaart</p>
        </div>
        <div className="dashboard-widget-content" id="map">
          <VerticalTimeline layout={'one-column'}>
            <Delay />
          </VerticalTimeline>
        </div>
      </div>
    )
  }
}

Delays.propTypes = {
  delays: PropTypes.object
}

export default Delays;
