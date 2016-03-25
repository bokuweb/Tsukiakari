import React, { Component, PropTypes } from 'react';
import Accounts from './accounts';
import Sidemenu from './sidemenu';
import Contents from './contents';
import Scheduler from './scheduler';

export default class Tsukiakari extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    accounts: PropTypes.object,
    tweets: PropTypes.object,
  };

  componentWillMount() {
    this.props.actions.accounts.loadAccounts();
  }

  renderContents() {
    const { accounts } = this.props.accounts;
    const { fetchHomeTimeline } = this.props.actions.tweets;
    const { timeline } = this.props.tweets;
    if (accounts.length === 0) return null;
    return (
      <Contents
        accounts={accounts}
        timeline={timeline}
        fetchHomeTimeline={fetchHomeTimeline}
      />
    );
  }

  render() {
    const { accounts } = this.props.accounts;
    return (
      <div className="container">
        <Scheduler />
        <Accounts accounts={accounts} />
        <Sidemenu />
        {this.renderContents()}
      </div>
    );
  }
}
