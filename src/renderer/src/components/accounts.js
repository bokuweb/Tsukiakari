import React, { Component, PropTypes } from 'react';
import B from '../lib/bem';

const b = B.with('accounts');

export default class Accounts extends Component {
  static propTypes = {
    accounts: PropTypes.array,
    addAccount: PropTypes.func.isRequired,
  }

  static defaultProps = {
    accounts: [],
  };

  constructor(props) {
    super(props);
    this.onAddRequest = ::this.onAddRequest;
  }

  onAddRequest() {
    this.props.addAccount();
  }

  renderAccounts() {
    return this.props.accounts.map(account => (
      <div className={b('account')} key={account.id}>
        <img
          src={account.profile_image_url}
          className={b('avatar')}
        />
      </div>
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
