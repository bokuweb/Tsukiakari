import React, { Component, PropTypes } from 'react';
import B from '../lib/bem';

const b = B.with('accounts');

export default class Accounts extends Component {
  static propTypes = {
    accounts: PropTypes.array,
  }

  static defaultProps = {
    accounts: [],
  };

  renderAccounts() {
    return this.props.accounts.map(account => (
      <div key={account.id}>
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
        <div className={b('add')}>
          <span className={b('icon', { add: true })}>+</span>
        </div>
      </div>
    );
  }
}
