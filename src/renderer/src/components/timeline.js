import React, { Component } from 'react';
import Infinite from 'react-infinite';
import TweetItem from './tweetitem';

export default class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timelineHeight: 100
    };
  }

  componentDidMount() {
    const timeline = document.querySelector('.timeline');
    console.log(timeline.scrollHeight)
    console.log(timeline.clientHeight)
    this.setState({timelineHeight: timeline.scrollHeight});

  }

  onInfiniteLoad() {
    //if (this.props.menu.keywords.length === 0) return;
    //if (this.props.feed[this.props.menu.activeKeyword].isPageEnd) return;
    //console.log("loading..");
    //this.props.fetchFeed(this.props.feed, this.props.menu);
  }

  elementInfiniteLoad() {
    //if (this.props.feed[this.props.menu.activeKeyword].isPageEnd) return;
    return  <div className="rect-spinner">spinner</div>;
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
        <Infinite
           elementHeight={40}
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
