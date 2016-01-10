import React, { Component } from 'react';
import TweetItem from './tweetitem';

export default class Timeline extends Component {
  constructor(props) {
    super(props);
  }

  getTimeline() {
    return this.props.timeline.map(tweet => {
      return (
        <TweetItem
           key={tweet.id}
           tweet={tweet} />
      );
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
