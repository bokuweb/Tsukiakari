import React, { Component, PropTypes } from 'react';
import ReactList from 'react-list';
import TweetItem from './tweetitem';
import Spinner from './spinner';
import B from '../lib/bem';

const b = B.with('timeline');

export default class Timeline extends Component {
  static propTypes = {
    results: PropTypes.array,
    timeline: PropTypes.object,
    id: PropTypes.string,
    createFavorite: PropTypes.func,
    destroyFavorite: PropTypes.func,
    openLightBox: PropTypes.func,
    reply: PropTypes.func,
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
    const { id, key } = this.props.results[index];
    if (!this.props.timeline[key]) return null;
    return (
      <div
        className={b('item', { animated: true })}
        key={id}
        ref={ref}
      >
        <TweetItem
          tweet={this.props.timeline[key].entities.tweets[id]}
          createReply={this.props.createReply}
          createFavorite={this.props.createFavorite}
          createRetweet={this.props.createRetweet}
          destroyFavorite={this.props.destroyFavorite}
          destroyRetweet={this.props.destroyRetweet}
          reply={this.props.reply}
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
          {
            this.props.results.length === 0
              ? <Spinner style={{ padding: '50px 0 0 20px' }} />
              : (
                  <ReactList
                    itemRenderer={::this.renderItems}
                    length={this.props.results.length}
                    type="variable"
                    pageSize={20}
                    useTranslate3d
                  />
              )
          }
        </div>
      </div>
    );
  }
}
