import React, { Component, PropTypes } from 'react';
import { isEmpty, isEqual } from 'lodash';
import TweetItem from './tweetitem';

const defaultElementHeight = 140;

export default class Timeline extends Component {
  static propTypes = {
    timeline: PropTypes.array,
    id: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.scrollTimer = null;
    this.isInitialized = false;
    this.state = {
      timelineHeight: 1000,
      elementHeight: defaultElementHeight,
      hasRendered: {},
    };
    this.onMouseDown = ::this.onMouseDown;
  }

  onMouseDown(e) {
    e.stopPropagation();
  }

  onInfiniteLoad() {

  }

  getTimeline() {
    const { hasRendered } = this.state;
    return this.props.timeline.map(tweet => ( // FIXME:
      <div
        className={`timeline__item ${hasRendered[tweet.id] ? '' : 'timeline__item--animated'}`}
        id={tweet.id} key={`${this.props.id}${tweet.id}`}
      >
        <TweetItem tweet={tweet} />
      </div>
    ));
  }

  render() {
    return (
      <div className="timeline" onMouseDown={this.onMouseDown}>
        <div className={`timeline__infinite timeline__infinite--${this.props.id}`} >
          {this.getTimeline()}
        </div>
      </div>
    );
  }
}
