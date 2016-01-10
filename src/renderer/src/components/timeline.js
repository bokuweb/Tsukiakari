import React, { Component } from 'react';
import TweetItem from './tweetitem';

export default class Timeline extends Component {
  constructor(props) {
    super(props);
  }

  getTimeline() {
    return this.props.timeline.map(tweet => {
      return <TweetItem tweet={tweet} />;
    });
  }

  render() {
    return (
      <div className="timeline">
        {this.getTimeline()}
      </div>
    );
  }
}
