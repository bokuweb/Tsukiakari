import React, { Component } from 'react';
import ReactList from 'react-list';
import TweetItem from '../containers/tweetitem';
import Spinner from './spinner';
import B from '../lib/bem';
import log from '../lib/log';

const b = B.with('timeline');

const styles = {
  spinner: {
    padding: '50px 0 0 40px',
  },
};

export default class Timeline extends Component {
  constructor(props) {
    super(props);
    this.onMouseDown = ::this.onMouseDown;
    this.onScroll = ::this.onScroll;
    this.renderItems = ::this.renderItems;
    this.scrollTimer = null;
  }

  componentDidMount() {
    // this.refs.scroll.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount() {
    // this.refs.scroll.removeEventListener('scroll', this.onScroll);
  }

  onScrollEnd() {
    this.scrollTimer = null;
    const infinite = this.refs.scroll;
    const scrollHeight = infinite.scrollHeight;
    const offset = infinite.offsetHeight;
    const scrollTop = infinite.scrollTop;
    const proximity = 140;
    if (scrollHeight - scrollTop - offset <= proximity) {
      log.debug('scroll end');
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
        <TweetItem id={id} timelineKey={key} />
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
              ? <Spinner style={styles.spinner} />
              : (
                  <ReactList
                    ref="list"
                    itemRenderer={this.renderItems}
                    length={this.props.results.length}
                    type="variable"
                    threshold={300}
                    pageSize={5}
                    useTranslate3d
                  />
              )
          }
        </div>
      </div>
    );
  }
}
