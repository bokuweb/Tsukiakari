import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import B from '../lib/bem';

const b = B.with('account-selector');

export default class AccountList extends Component {
  static defaultProps = {
    onSelect: () => null,
    accounts: [],
    selectedAccount: {},
  };

  onSelect(account) {
    this.props.onSelect(account);
  }

  renderAccounts() {
    if (isEmpty(this.props.accounts)) return null;
    return this.props.accounts.map(account => {
      const onClick = this.onSelect.bind(this, account);
      return (
        <div key={account.id} onClick={onClick}>
          <img
            src={account.profile_image_url}
            className={b('avatar')}
            style={
              account.id === this.props.selectedAccount.id
                ? { border: 'solid 2px #BDC3C7', opacity: 1 }
                : {}
              }
          />
        </div>
      );
    });
  }

  render() {
    return (
      <div style={{ display: 'flex' }}>
        {this.renderAccounts()}
      </div>
    );
  }
}
