import React from 'react';
import Delay from './Delay';
import PropTypes from 'prop-types';


import './Feed.css'

class Delays extends React.Component {

  render = () => {
    // var content = this.props.delays.map((delay) => {
    //   return (
    //     <Delay key={delay.id} delay={delay} />
    //   )
    // })

    // console.log("wat");


    // return (
    //   <ul className="delays">Content hier: {content}</ul>
    // )

    return (
      <ul className="delays">
        <Delay />
        <Delay />
        <Delay />
        <Delay />
      </ul>
    )
  }
}

Delays.propTypes = {
  delays: PropTypes.object
}

export default Delays;
