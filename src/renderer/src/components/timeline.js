import React, { Component } from 'react';
import Infinite from 'react-infinite';
import TweetItem from './tweetitem';

const defaultElementHeight = 100;

export default class Timeline extends Component {
  constructor(props) {
    super(props);
    this.scrollTimer = null;
    this.state = {
      timelineHeight: 100,
      elementHeight: defaultElementHeight
    };
    this.onWindowResize = this.onWindowResize.bind(this);
    //window.addEventListener('resize', this.onWindowResize)
  }

  componentDidMount() {
    this.updateTimelineHeight();
    const infinite = document.querySelector('.timeline__infinite');
    infinite.addEventListener('scroll', ::this.onInfiniteScroll);
  }

  componentDidUpdate() {
    this.updateElementHeight(this.props.timeline);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize);
  }

  onWindowResize() {
    console.log('window resize');
    this.updateTimelineHeight();
    this.updateElementHeight(this.props.timeline);
  }

  onInfiniteScroll() {
    console.log('scroll');
    clearTimeout(this.scrollTimer);
    this.scrollTimer = setTimeout(() => {
      this.updateElementHeight(this.props.timeline);
    }, 100);
  }

  updateTimelineHeight () {
    const timeline = document.querySelector('.timeline');
    const timelineHeight = timeline.clientHeight;
    this.setState({timelineHeight});
    console.log(timelineHeight);
  }

  updateElementHeight (timeline) {
    const height = timeline.map((tweet, i) => {
      const el = document.getElementById(i);
      if (el) return el.clientHeight;
      if (this.state.elementHeight[i]) return this.state.elementHeight[i];
      return defaultElementHeight;
    });
    console.dir(height)
  }

  onInfiniteLoad() {
    console.log('onload');
    //if (this.props.menu.keywords.length === 0) return;
    //if (this.props.feed[this.props.menu.acTivekeyword].isPageEnd) return;
    //console.log("loading..");
    //this.props.fetchFeed(this.props.feed, this.props.menu);
  }

  elementInfiniteLoad() {
    //if (this.props.feed[this.props.menu.activeKeyword].isPageEnd) return;
    return  <div className="rect-spinner">spinner</div>;
  }

  getTimeline() {
    return this.props.timeline.map((tweet, i) => {
      // FIXME:
      return (
        <div className="timeline__item" id={i} key={tweet.id}>
          <TweetItem tweet={tweet} />
        </div>
      );
    });
  }

  render() {
    const {timelineHeight, elementHeight} = this.state;
    console.log(timelineHeight);
    return (
      <div className="timeline">
        <Infinite
           elementHeight={elementHeight}
           containerHeight={timelineHeight}
           infiniteLoadBeginEdgeOffset={100}
           onInfiniteLoad={::this.onInfiniteLoad}
           loadingSpinnerDelegate={this.elementInfiniteLoad()}
           isInfiniteLoading={true}
           className={'timeline__infinite'}>
          {this.getTimeline()}
        </Infinite>
      </div>
    );
  }
}
