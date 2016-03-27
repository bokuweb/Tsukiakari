import React, { Component, PropTypes } from 'react';

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
          className="accounts__avatar"
        />
        {/* <span className="accounts__name">{account.screen_name}</span> */ }
      </div>
    ));
  }

  render() {
    return (
      <div className="accounts">
        <div className="accounts__accounts">
          {this.renderAccounts()}
        </div>
        <div className="accounts__add">
        <i className="accounts__icon--add icon-plus" />
        </div>
      </div>
    );
  }
}
