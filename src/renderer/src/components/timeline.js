import React, { Component, PropTypes } from 'react';
import ReactList from 'react-list';
import TweetItem from './tweetitem';
import B from '../lib/bem';

const b = B.with('timeline');

export default class Timeline extends Component {
  static propTypes = {
    timeline: PropTypes.object,
    id: PropTypes.string,
    createFavorite: PropTypes.func,
    openLightBox: PropTypes.func,
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

  renderItems(index, ref) {
    const { results, entities } = this.props.timeline;
    const id = results[index];
    return (
      <div
        className={b('item', { animated: true })}
        key={id}
        ref={ref}
      >
        <TweetItem
          tweet={entities.tweets[id]}
          createReply={this.props.createReply}
          createFavorite={this.props.createFavorite}
          createRetweet={this.props.createRetweet}
          destroyFavorite={this.props.destroyFavorite}
          destroyRetweet={this.props.destroyRetweet}
          accounts={this.props.accounts}
          openLightBox={this.props.openLightBox}
        />
      </div>
    );
  }

  render() {
    return (
      <div className={b()} onMouseDown={this.onMouseDown}>
        <div
          className={b('infinite')}
          ref="scroll"
        >
          <ReactList
            itemRenderer={::this.renderItems}
            length={this.props.timeline.results.length}
            type="variable"
            useTranslate3d
          />
        </div>
      </div>
    );
  }
}
