import React, { Component, PropTypes } from 'react';
import Accounts from './accounts';
import Sidemenu from './sidemenu';
import Contents from './contents';

export default class Tsukiakari extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    accounts: PropTypes.object,
    tweets: PropTypes.object,
  };

  componentWillMount() {
    const { fetchHomeTimeline } = this.props.actions.tweets;
    this.props.actions.accounts.loadAccounts();
    setInterval(() => {
      if (this.props.accounts.accounts[0]) fetchHomeTimeline(this.props.accounts.accounts[0]);
    }, 60 * 1000);
  }

  render() {
    const {
      tweets: { timeline },
      accounts: { accounts },
    } = this.props;
    return (
      <div className="container">
        <Accounts accounts={accounts} />
        <Sidemenu />
        <Contents timeline={timeline} />
      </div>
    );
  }
}
