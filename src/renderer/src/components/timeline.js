import React, { Component } from 'react';
import Infinite from 'react-infinite';
import TweetItem from './tweetitem';

export default class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timelineHeight: 100,
      elementHeight: 40
    };
 }

  componentDidMount() {
    const timeline = document.querySelector('.timeline');
    const infinite = document.querySelector('.timeline__infinite');
    const timelineHeight = timeline.scrollHeight;
    this.setState({timelineHeight});
    infinite.addEventListener('scroll', () => {
      console.log('scroll');
      this.updateElementHeight(this.props.timeline);
    });
  }

  componentDidUpdate() {
    this.updateElementHeight(this.props.timeline);
  }

  updateElementHeight (timeline) {
    const height = timeline.map((tweet, i) => {
      const el = document.getElementById(i);
      if (el) return el.clientHeight;
      else if (this.state.elementHeight[i]) return this.state.elementHeight[i];
      else return 40;
    });
    console.dir(height);
  }

  onInfiniteLoad() {
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
        <div className="timeline__item" id={i}>
          <TweetItem
             key={tweet.id}
             tweet={tweet} />
        </div>
      );
    });
  }

  render() {
    return (
      <div className="timeline">
        <Infinite
           elementHeight={this.state.elementHeight}
           containerHeight={this.state.timelineHeight}
           infiniteLoadBeginEdgeOffset={100}
           onInfiniteLoad={this.onInfiniteLoad.bind(this)}
           loadingSpinnerDelegate={this.elementInfiniteLoad()}
           isInfiniteLoading={true}
           className={'timeline__infinite'}>
          {this.getTimeline()}
        </Infinite>
      </div>
    );
  }
}
