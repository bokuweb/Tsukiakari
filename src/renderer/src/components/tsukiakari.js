import React, { Component } from 'react';
import Accounts from './accounts';
import Sidemenu from './sidemenu';
import Contents from './contents';

export default class Tsukiakari extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { loadAccounts } = this.props.actions.accounts;
    loadAccounts();
  }

  render() {
    const { accounts } = this.props.accounts;
    const { fetchHomeTimeline } = this.props.actions.tweets;
    const { timeline } = this.props.tweets;
    return (
      <div className="container">
        <Accounts accounts={accounts} />
        <Sidemenu />
        {
          (accounts.length !== 0)
            ? <Contents
              accounts={accounts}
              timeline={timeline}
              fetchHomeTimeline={fetchHomeTimeline} />
            : <div />
        }
      </div>
    );
  }
}
