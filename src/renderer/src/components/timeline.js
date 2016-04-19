import React, { Component, PropTypes } from 'react';
import { isEmpty, isEqual } from 'lodash';
import TweetItem from './tweetitem';

export default class Timeline extends Component {
  static propTypes = {
    timeline: PropTypes.array,
    id: PropTypes.string,
    createFavorite: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.onMouseDown = ::this.onMouseDown;
    this.onScroll = ::this.onScroll;
    this.scrollTimer = null;
  }

  componentDidMount() {
    this.refs.scroll.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    this.refs.scroll.removeEventListener('scroll', this.onScroll);
  }

  onScrollEnd() {
    this.scrollTimer = null;
    const infinite = this.refs.scroll;
    const scrollHeight = infinite.scrollHeight;
    const offset = infinite.offsetHeight;
    const scrollTop = infinite.scrollTop;
    const proximity = 140;
    if (scrollHeight - scrollTop - offset <= proximity) {
      console.log('scroll end')
    }
  }

  onScroll() {
    if (this.scrollTimer) clearTimeout(this.scrollTimer);
    this.scrollTimer = setTimeout(() => {
      this.onScrollEnd();
    }, 500);
  }

  onMouseDown(e) {
    e.stopPropagation();
  }

  onInfiniteLoad() {

  }


  getTimeline() {
    return this.props.timeline.map(tweet => ( // FIXME:
      <div
        className="timeline__item timeline__item--animated"
        id={tweet.id} key={`${this.props.id}${tweet.id}`}
      >
        <TweetItem
          tweet={tweet}
          createFavorite={this.props.createFavorite}
          accounts={this.props.accounts}
        />
      </div>
    ));
  }

  render() {
    return (
      <div className="timeline" onMouseDown={this.onMouseDown}>
        <div
          className={`timeline__infinite timeline__infinite--${this.props.id}`}
          ref="scroll"
        >
          {this.getTimeline()}
        </div>
      </div>
    );
  }
}
