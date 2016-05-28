import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import { Button } from 'react-bulma';
import AccountList from './account-list';
import B from '../lib/bem';

const b = B.with('account-selector');

export default class AccountSelector extends Component {
  static propTypes = {
    onSelect: PropTypes.func,
    accounts: PropTypes.array,
  };

  static defaultProps = {
    onSelect: () => null,
    accounts: [],
  }

  constructor(props) {
    super(props);
    // FIXME: use first instead of index 0
    this.state = { selectedAccount: props.accounts[0] };
    this.onSelect = ::this.onSelect;
  }

  componentWillReceiveProps(next) {
    if (isEmpty(this.props.accounts) && !isEmpty(next.accounts)) {
      // FIXME: use first instead of index
      this.setState({ selectedAccount: next.accounts[0] });
      this.onSelect(next.accounts[0]);
    }
  }

  onSelect(account) {
    this.props.onSelect(account);
  }

  render() {
    return (
      <div className={b()}>
        <div className={b('title-wrapper')}>
          <i className={`${b('icon', { users: true })} lnr lnr-users`} />
          <span className={b('title')}>Choose account</span>
        </div>
        <div className={b('accounts')}>
          <AccountList accounts={this.props.accounts} />
        </div>
        <div className={b('buttons')}>
          <Button
            className={b('button', { back: true })}
            onClick={this.props.onBackClick}
          >
            Back
          </Button>
          <Button
            style={{ marginLeft: '6px' }}
            onClick={this.props.onCreate.bind(this, this.state.selectedAccount)}
          >
            Create
          </Button>
        </div>
      </div>
    );
  }
}
