import React, { Component, PropTypes } from 'react';

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
    this.onSelect = ::this.onSelect;
  }

  onSelect(account) {
    this.props.onSelect(account);
  }

  renderAccounts() {
    if (!this.props.accounts[0]) return null;
    return this.props.accounts.map(account => (
      <div key={this.props.accounts[0].id} onClick={this.onSelect.bind(this, account)}>
        <img
          src={this.props.accounts[0].profile_image_url}
          className="account-selector__avatar"
        />
        {/* <span className="accounts__name">{account.screen_name}</span> */ }
      </div>
    ));
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
