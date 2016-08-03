/* @flow */

import React, { PureComponent } from 'react';
import B from '../lib/bem';

const b = B.with('tweet-window-header');

type Props = {
  close: Function,
};

export default class TweetWindowHeader extends PureComponent {

  props: Props;

  render(): ?React$Element<*> {
    return (
      <div className={b('title-wrapper')}>
        <span className={b('title')}>
          <i className={`${b('icon')} icon-tweet`} />
          New Tweet
        </span>
        <i
          className={`${b('icon')} lnr lnr-cross`}
          onClick={this.props.close}
        />
      </div>
    );
  }
}
