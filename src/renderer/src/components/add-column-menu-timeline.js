/* @flow */

import React, { Component } from 'react';
import ReactList from 'react-list';
import TweetItem from '../containers/tweetitem';
import B from '../lib/bem';
import Spinner from './spinner';

import type { Tweet } from '../../../types/tweet';
import type { LoadingStatus } from '../../../types/common';

const b = B.with('add-column-menu-timeline');

type Props = {
  result: Array<string>;
  title: ?string;
  tweets: {
    [id: string]: Tweet;
  };
  loadingStatus: LoadingStatus;
};

export default class Timeline extends Component {
  constructor(props: Props) {
    super(props);
    this.renderItems = this.renderItems.bind(this);
  }

  /* eslint-disable react/sort-comp */
  props: Props;
  renderItems: Function;
  infinite: React$Element<*>;

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
    const { loadingStatus, result } = this.props;
    if (loadingStatus === 'idle') return null;
    if (loadingStatus === 'loading') return <Spinner style={{ marginTop: '90px' }} />;
    if (loadingStatus === 'loaded' && result.length === 0) {
      return (
        <div className={b()}>not found</div>
      );
    }
    return (
      <div className={b()}>
        <div className={b('title')}>
          {this.props.title}
        </div>
        <div
          className={b('infinite')}
          ref={(c: React$Element<*>) => { this.infinite = c; }}
        >
          <ReactList
            ref="list"
            itemRenderer={this.renderItems}
            length={result.length}
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
