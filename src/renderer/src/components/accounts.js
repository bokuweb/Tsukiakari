import React, { Component } from 'react';

export default class Accounts extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.dir(this.props);
    const {accounts} = this.props;
    return (
      <div className="accounts">
        {
          do {
            return accounts.map(account => {
              return account.name;
            });
          }
        }
      </div>
    );
  }
}
