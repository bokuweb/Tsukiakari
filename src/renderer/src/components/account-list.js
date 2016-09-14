import React, { Component } from 'react';
import { isEmpty, isEqual } from 'lodash';
import B from '../lib/bem';

const b = B.with('account-selector');

const styles = {
  avatar: {
    border: 'solid 2px #8f9fad',
    opacity: 1,
  },
};

export default class AccountList extends Component {
  static defaultProps = {
    accounts: [],
    selectedAccount: {},
  };

  shouldComponentUpdate(nextProps: Props, nextState: State): bool {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
  }

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
                ? styles.avatar
                : undefined
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
