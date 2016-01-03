import React, { Component } from 'react';

export default class Accounts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {accounts} = this.props;
    return (
      <div className="accounts">
        {
          do {
            accounts.map(account => {
              return account.name;
            });
          }
        }
      </div>
    );
  }
}
