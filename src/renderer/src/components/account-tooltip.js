import React, { Component, PropTypes } from 'react';
import B from '../lib/bem';

const b = B.with('account-tooltip');

export default class AccountTooltip extends Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
    self: PropTypes.bool,
  }

  static defaultProps = {
    self: true,
  };

  render() {
    const { account } = this.props;
    return (
      <div className={b()}>
        <div
          className={b('background')}
          style={{
            background: `url(${account.profile_banner_url})`,
            backgroundSize: 'cover',
          }}
        >
          <img
            src={account.profile_image_url}
            className={b('avatar')}
          />
        </div>
        <div className={b('name-wrapper')}>
          <p className={b('name')}>{account.name}</p>
          <p className={b('screen-name')}>@{account.screen_name}</p>
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
