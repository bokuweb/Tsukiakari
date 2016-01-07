import React, { Component } from 'react';
import Accounts from './accounts';
import Sidemenu from './sidemenu';

export default class Tsukiakari extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {loadAccounts} = this.props.actions.accounts;
    loadAccounts();
  }

  render() {
    const {accounts} = this.props.accounts;
    return (
      <div className="container">
        <Accounts accounts={accounts} />
        <Sidemenu />
        <div className="content">ああああいいういaaaasadsdsadsadcdddaaa</div>
      </div>
    );
  }
}
