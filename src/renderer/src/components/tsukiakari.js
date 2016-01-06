import React, { Component } from 'react';
import Accounts from './accounts';

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
        <div className="sidemenu">
          <div className="logo_wrapper">
            <img className="logo" src="images/logo.png" />
          </div>
          <div className="button--newtweet">
            <i className="icon-twitter"/>
            <span>New Tweet</span>
          </div>
        </div>
        <div className="content">ああああいいういaaaasadsdsadsadcdddaaa</div>
      </div>
    );
  }
}
