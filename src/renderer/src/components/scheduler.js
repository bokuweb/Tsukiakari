import React, { Component, PropTypes } from 'react';

export default class Scheduler extends Component {
  static propTypes = {
    activePane: PropTypes.array,
    fetch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {};
    console.log('aaaaa')
    setInterval(() => {
      console.log('fetch!!')
      this.props.fetch();
    }, 60 * 1000);
  }

  componentWillMount() {
    this.props.fetch(this.props.accounts[0]);
  }

  render() {
    return null;
  }
}
