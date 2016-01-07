import React, { Component } from 'react';

export default class Sidemenu extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchHomeTimeline(this.props.accounts[0]);
  }

  getTimeline() {
    return this.props.timeline.map(tweet => {
      return tweet.text;
    });
  }
  render() {
    return (
      <div className="contents">
        {this.getTimeline()}
      </div>
    );
  }
}
