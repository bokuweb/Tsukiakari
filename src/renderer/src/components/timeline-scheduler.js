import React, { Component, PropTypes } from 'react';

export default class TimelineScheduler extends Component {
  static propTypes = {
    activePane: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.scrollTimer = null;
    this.isInitialized = false;
    this.state = {
    };
  }

  render() {
    return null;
  }
}
