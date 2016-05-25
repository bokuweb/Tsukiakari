import React, { Component, PropTypes } from 'react';
import Tooltip from 'rc-tooltip';
import AccountTooltip from './account-tooltip';
import B from '../lib/bem';

const b = B.with('account');

export default class Account extends Component {
  static propTypes = {
    account: PropTypes.object.isRequired,
    removeAccount: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { destroyTooltip: false };
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
          overlay={
            <AccountTooltip account={account} buttonText="Remove" onButtonClick={removeAccount} />
          }
          destroyTooltipOnHide={this.state.destroyTooltip}
          placement="rightBottom"
          mouseLeaveDelay={0}
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
