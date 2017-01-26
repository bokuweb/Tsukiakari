import React, { Component, PropTypes } from 'react';
import { Button } from 're-bulma';
import B from '../lib/bem';
import T from '../lib/twitter-client';

const b = B.with('account-tooltip');

export default class AccountTooltip extends Component {
  static defaultProps = {
    self: true,
    buttonText: '',
    onButtonClick: () => null,
  };

  constructor(props) {
    super(props);
    this.onClick = ::this.onClick;
  }

  //TODO
  onClick() {
    console.log(this.props.account)
  }

  render() {
    const { account, buttonText } = this.props;
    return (
      <div className={b()}>
        <div
          className={b('background')}
          style={{
            background: `url(${account.profile_banner_url || ''}) #${account.profile_link_color}`,
            backgroundSize: 'cover',
          }}
        >
          <img
            src={account.profile_image_url}
            className={b('avatar')}
          />
        </div>
        <div className={b('header')}>
          <div className={b('name-wrapper')}>
            <p className={b('name')}>{account.name}</p>
            <p className={b('screen-name')}>@{account.screen_name}</p>
          </div>
          <div className={b('button-wrapper')}>
            <Button
              className={b('button')}
              onClick={this.onClick}
            >
              {buttonText}
            </Button>
          </div>
        </div>
        <div className={b('status')}>
          <div>
            <p className={b('status-header')}>tweets</p>
            <p className={b('status-number')}>{account.statuses_count}</p>
          </div>
          <div>
            <p className={b('status-header')}>following</p>
            <p className={b('status-number')}>{account.friends_count}</p>
          </div>
          <div>
            <p className={b('status-header')}>followers</p>
            <p className={b('status-number')}>{account.followers_count}</p>
          </div>
        </div>
      </div>
    );
  }
}
