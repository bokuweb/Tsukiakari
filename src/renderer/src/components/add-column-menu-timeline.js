/* @flow */

import React, { Component } from 'react';
import ReactList from 'react-list';
import TweetItem from '../containers/tweetitem';
import B from '../lib/bem';
import log from '../lib/log';

import type { Tweet } from '../../../types/tweet';

const b = B.with('add-column-menu-timeline');

type Props = {
  result: Array<string>;
  tweets: {
    [id: string]: Tweet;
  };
};

export default class Timeline extends Component {
  constructor(props: Props) {
    super(props);
    this.onMouseDown = this.onMouseDown.bind(this);
    this.renderItems = this.renderItems.bind(this);
  }

  /* eslint-disable react/sort-comp */
  props: Props;
  onMouseDown: Function;
  renderItems: Function;
  infinite: React$Element<*>;

  onMouseDown(e: Event) {
    e.stopPropagation();
  }

  renderItems(index: number, ref: React$Element<*>): ?React$Element<*> {
    const id = this.props.result[index];
    if (!this.props.tweets[id]) return null;
    return (
      <div
        className={b('item', { animated: true })}
        key={id}
        ref={ref}
      >
        <TweetItem id={id} />
      </div>
    );
  }

  render(): ?React$Element<*> {
    return (
      <div className={b()} onMouseDown={this.onMouseDown}>
        <div
          className={b('infinite')}
          ref={(c: React$Element<*>) => { this.infinite = c; }}
        >
          <ReactList
            ref="list"
            itemRenderer={this.renderItems}
            length={this.props.result.length}
            type="variable"
            threshold={300}
            pageSize={5}
            useTranslate3d
          />
        </div>
      </div>
    );
  }
}
