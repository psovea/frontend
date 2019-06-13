import React from 'react';
import PropTypes from 'prop-types';

import { Loader as LoadIcon } from 'react-feather';
import './Feed.css'

class Loader extends React.Component {
  render = () => {
    return (
      <div className={"loader" + (this.props.paging ? " active" : "")}>
        <LoadIcon />
      </div>
    )
  }
}

Loader.propTypes = {
  paging: PropTypes.bool
}

export default Loader;
