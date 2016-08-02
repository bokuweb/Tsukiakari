/* @flow */

import React, { PureComponent } from 'react';
import { Button } from 're-bulma';
import B from '../lib/bem';

const b = B.with('tweet-window-footer');

type Props = {
  onSelectFile: Function,
  onClick: Function,
  remain: number,
  buttonState: string,
};

export default class TweetWindowFooter extends PureComponent {

  props: Props;

  render(): ?React$Element<*> {
    return (
      <div className={b()}>
        <div className={b('input-wrapper')}>
          <i className={`${b('icon', { file: true })} fa fa-camera`} />
          <input
            className={b('input')}
            onChange={this.props.onSelectFile}
            type="file"
            placeholder=""
          />
        </div>
        <div
          className={b('remain')}
          style={{ color: this.props.remain < 0 ? '#ed6c63' : '#666' }}
        >
          {this.props.remain}
        </div>
        <Button
          className={b('button')}
          onClick={this.props.onClick}
          color="isPrimary"
          state={this.props.buttonState}
        >
          <i className="icon-tweet" /> Tweet
        </Button>
      </div>
    );
  }
}
