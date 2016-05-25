import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bulma';
import B from '../lib/bem';

const b = B.with('account-tooltip');

export default class AccountTooltip extends Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
    self: PropTypes.bool,
    buttonText: PropTypes.string,
    onButtonClick: PropTypes.func,
  }

  static defaultProps = {
    self: true,
    buttonText: '',
    onButtonClick: () => null,
  };

  constructor(props) {
    super(props);
    this.onClick = ::this.onClick;
  }

  onClick() {
    this.props.onButtonClick(this.props.account);
  }

  render() {
    const { account, buttonText } = this.props;
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
        <div className={b('header')}>
          <div className={b('name-wrapper')}>
            <p className={b('name')}>{account.name}</p>
            <p className={b('screen-name')}>@{account.screen_name}</p>
          </div>
          <div className={b('button-wrapper')}>
            <Button
              style={{
                height: '28px',
                margin: '4px 0 0 0',
                fontSize: '11px',
                lineHeight: '20px',
              }}
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
