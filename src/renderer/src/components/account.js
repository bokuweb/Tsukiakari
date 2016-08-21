import React, { Component } from 'react';
import Tooltip from 'rc-tooltip';
import AccountTooltip from './account-tooltip';
import B from '../lib/bem';

const b = B.with('account');

export default class Account extends Component {
  constructor(props) {
    super(props);
    this.state = { destroyTooltip: false };
    this.removeAccount = ::this.removeAccount;
  }

  removeAccount(account) {
    if (window.confirm('If you really want to delete this account, select OK')) {
      this.props.removeAccount(account);
    }
  }

  render() {
    const { account, removeAccount } = this.props;
    return (
      <div
        className={b()}
        onMouseOver={() => this.setState({ destroyTooltip: false })}
        onMouseLeave={() => this.setState({ destroyTooltip: true })}
      >
        <Tooltip
          trigger="hover"
          prefixCls="account"
          overlay={
            <AccountTooltip
              account={account}
              buttonText="Remove"
              onButtonClick={this.removeAccount}
            />
          }
          destroyTooltipOnHide={this.state.destroyTooltip}
          placement="rightBottom"
          mouseLeaveDelay={0.2}
          overlayStyle={{
            position: 'absolute',
            left: '50px',
            zIndex: '9999',
          }}
        >
          <img
            src={account.profile_image_url}
            className={b('avatar')}
          />
        </Tooltip>
      </div>
    );
  }
}
