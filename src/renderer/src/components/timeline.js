import React, { Component, PropTypes } from 'react';
import Infinite from 'react-infinite';
import { isEmpty } from 'lodash';
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
    this.onWindowResize = ::this.onWindowResize;
    this.onMouseDown = ::this.onMouseDown;
  }

  componentDidMount() {
    this.updateTimelineHeight();
    const infinite = document.querySelector(`.timeline__infinite--${this.props.id}`);
    infinite.addEventListener('scroll', ::this.onScroll);
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.timeline.length !== nextProps.timeline.length) {
      this.updateElementState(nextProps.timeline);
    }
  }

  componentDidUpdate() {
    if (this.props.timeline.length === 0) return;
    if (this.isInitialized) return;
    this.isInitialized = true;
    // this.updateElementState();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  onMouseDown(e) {
    e.stopPropagation();
  }

  onWindowResize() {
    this.updateTimelineHeight();
    this.updateElementState(this.props.timeline);
  }

  onScroll() {
    if (this.scrollTimer) return;
    this.scrollTimer = setTimeout(() => {
      this.updateElementState(this.props.timeline);
      this.scrollTimer = null;
    }, 100);
  }

  updateElementState(timeline) {
    if (isEmpty(timeline)) return;
    const { hasRendered } = this.state;
    const elementHeight = timeline.map((tweet, i) => {
      const el = document.getElementById(tweet.id); // FIXME: not use id to avoid duplicate id
      if (el) {
        hasRendered[tweet.id] = true;
        return el.clientHeight;
      }
      if (this.state.elementHeight[i]) return this.state.elementHeight[i];
      hasRendered[tweet.id] = false;
      return defaultElementHeight;
    });
    this.setState({ elementHeight, hasRendered });
  }

  onInfiniteLoad() {
    console.log('onload');
    // if (this.props.menu.keywords.length === 0) return;
    // if (this.props.feed[this.props.menu.acTivekeyword].isPageEnd) return;
    // console.log("loading..");
    // this.props.fetchFeed(this.props.feed, this.props.menu);
  }

  elementInfiniteLoad() {
    // if (this.props.feed[this.props.menu.activeKeyword].isPageEnd) return;
    return null;
    return <div className="rect-spinner">spinner</div>;
  }

  getTimeline() {
    const { hasRendered } = this.state;
    return this.props.timeline.map((tweet, i) => ( // FIXME:
      <div
        className={`timeline__item ${hasRendered[tweet.id] ? '' : 'timeline__item--animated'}`}
        id={tweet.id} key={`${this.props.id}${tweet.id}`}
      >
        <TweetItem tweet={tweet} />
      </div>
    ));
  }

  updateTimelineHeight() {
    const timeline = document.querySelector('.timeline'); // FIXME use props timelin height
    const timelineHeight = timeline.getBoundingClientRect().height;
    this.setState({ timelineHeight });
  }

  render() {
    const { timelineHeight, elementHeight } = this.state;
    return (
      <div className="timeline" onMouseDown={this.onMouseDown}>
        <Infinite
          elementHeight={isEmpty(elementHeight) ? defaultElementHeight : elementHeight}
          containerHeight={timelineHeight}
          infiniteLoadBeginEdgeOffset={100}
          onInfiniteLoad={::this.onInfiniteLoad}
          loadingSpinnerDelegate={this.elementInfiniteLoad()}
          isInfiniteLoading
          className={`timeline__infinite timeline__infinite--${this.props.id}`}
        >
          {this.getTimeline()}
        </Infinite>
      </div>
    );
  }
}
