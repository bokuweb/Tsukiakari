import React, { Component, PropTypes } from 'react';
import Account from './account';
import B from '../lib/bem';

const b = B.with('accounts');

export default class Accounts extends Component {
  static defaultProps = {
    accounts: [],
  };

  constructor(props) {
    super(props);
    this.state = { destroyTooltip: false };
    this.onAddRequest = ::this.onAddRequest;
  }

  onAddRequest() {
    this.props.addAccount();
  }

  renderAccounts() {
    return this.props.accounts.map(account => (
      <Account account={account} key={account.id} removeAccount={this.props.removeAccount} />
    ));
  }

  render() {
    return (
      <div className={b()}>
        <div className={b('accounts')}>
          {this.renderAccounts()}
        </div>
        <div className={b('add')} onClick={this.onAddRequest}>
          <span className={b('icon', { add: true })}>+</span>
        </div>
      </div>
    );
  }
}
