import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';

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
    this.state = { selectedId: props.accounts[0] ? props.accounts[0].id : null };
    this.onSelect = ::this.onSelect;
  }

  componentWillReceiveProps(next) {
    if (isEmpty(this.props.accounts) && !isEmpty(next.accounts)) {
      // FIXME: use first instead of index 0
      this.setState({ selectedId: next.accounts[0].id });
      this.onSelect(next.accounts[0]);
    }
  }

  onSelect(account) {
    this.props.onSelect(account.id);
  }

  renderAccounts() {
    if (isEmpty(this.props.accounts)) return null;
    return this.props.accounts.map(account => {
      const onClick = this.onSelect.bind(this, account);
      return (
        <div key={this.props.accounts[0].id} onClick={onClick}>
          <img
            src={this.props.accounts[0].profile_image_url}
            className="account-selector__avatar"
          />
          {/* <span className="accounts__name">{account.screen_name}</span> */ }
        </div>
      );
    });
  }

  render() {
    return (
      <div className="account-selector" >
        <div className="account-selector__title-wrapper" >
          <i className="account-selector__icon--users lnr lnr-users" />
          <span className="account-selector__title">Account</span>
        </div>
        <div className="account-selector__accounts" >
          {this.renderAccounts()}
        </div>
      </div>
    );
  }
}
