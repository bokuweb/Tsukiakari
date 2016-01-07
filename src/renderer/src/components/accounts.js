import React, { Component } from 'react';

export default class Accounts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {accounts} = this.props;
    console.dir(accounts);
    return (
      <div className="accounts">
        <div className="accounts__accounts">
          {
            do {
              accounts.map(account => {
                return (
                  <div key={account.id}>
                    <img
                       src={account.profile_image_url}
                       className="accounts__avatar"/>
                    <span className="accounts__name">{account.screen_name}</span>
                  </div>
                );
              });
            }
          }
        </div>
        <div className="accounts__add">
        <i className="accounts__icon--add icon-plus"/>
        </div>
      </div>
    );
  }
}
