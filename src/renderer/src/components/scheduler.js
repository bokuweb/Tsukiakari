import React, { Component, PropTypes } from 'react';

export default class Scheduler extends Component {
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
