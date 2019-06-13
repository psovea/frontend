import React from 'react';
import Delays from './Delays';
import Loader from './Loader';
import NotificationBar from './NotificationBar'
import { Rewind } from 'react-feather';

import './Feed.css'

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kind: props.kind
    }
  }

  // getInitialState = (props) => {
  //   props = props || this.props;

  //   return {
  //     delays: props.delays,
  //     count: 0,
  //     page: 0,
  //     paging: false,
  //     skip: 0,
  //     done: false
  //   }
  // }

  // componentWillReceiveProps = (newProps, oldProps) => {
  //   this.setState(this.getInitialState(newProps));
  // }

  // componentDidMount = () => {
  //   var data = 'test';
  //   self.addDelay(data);
  // }

  // addDelay = (delay) => {
  //   var updated = this.state.delays;
  //   var count = this.state.count + 1;
  //   var skip = this.state.skip + 1;
  //   updated.unshift(delay);
  //   this.setState({tweets: updated, count: count, skip: skip})
  // }

  // showNewDelays = () => {
  //   var updated = this.state.delays;

  //   updated.forEach(delay => {
  //     delay.active = true;
  //   })

  //   this.setState({delays: updated, count: 0})
  // }

  // checkWindowScroll = () => {
  //   var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  //   var s = document.body.scrollTop;
  //   var scrolled = (h + s) ? document.body.offsetHeight;

  //   if (scrolled && !this.state.paging && !this.state.done) {
  //     this.setState({paging: true, page: this.state.page + 1});
  //     this.getPage(this.state.page);
  //   }
  // }

  // getPage = (page) => {
  //   var req = new XMLHttpRequest(), self = this;
  //   req.open()
  // }

  render() {
    return (
      <div className="feed">
        <NotificationBar/>
        <Delays/>
        <Loader/>
      </div>
    )
  }
}

export default Feed;
