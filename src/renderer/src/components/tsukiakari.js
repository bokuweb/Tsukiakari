import React, { Component } from 'react';

export default class Tsukiakari extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.actions.accounts.loadAccounts();
  }

  render() {
    return (
      <div className="container">
        <div className="users">abbb</div>
        <div className="sidemenu">
          <img className="logo" src="images/logo.png" />
        </div>
        <div className="content">ああいいういaaaasadsdsadsadcdddaaa</div>
      </div>
    );
  }
}
