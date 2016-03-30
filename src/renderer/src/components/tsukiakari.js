import React, { Component, PropTypes } from 'react';
import { isEmpty } from 'lodash';
import Accounts from './accounts';
import Sidemenu from './sidemenu';
import Contents from './contents';
import AddColumnMenu from './add-column-menu';

export default class Tsukiakari extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    accounts: PropTypes.object,
    tweets: PropTypes.object,
    sidemenu: PropTypes.object,
  };

  componentWillMount() {
    const { fetchHomeTimeline } = this.props.actions.tweets;
    this.props.actions.accounts.loadAccounts();
    setInterval(() => {
      if (this.props.accounts.accounts[0]) fetchHomeTimeline(this.props.accounts.accounts[0]);
    }, 60 * 1000);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchHomeTimeline } = this.props.actions.tweets;
    if (isEmpty(this.props.accounts.accounts) && !isEmpty(nextProps.accounts.accounts)) {
      fetchHomeTimeline(nextProps.accounts.accounts[0]);
    }
  }

  render() {
    const {
      tweets: { timeline },
      accounts: { accounts },
      sidemenu: { isAddColumnMenuOpen },
    } = this.props;
    const { openAddColumnMenu, closeAddColumnMenu } = this.props.actions.sidemenu;
    return (
      <div className="container">
        <Accounts accounts={accounts} />
        <Sidemenu
          openAddColumnMenu={openAddColumnMenu}
          closeAddColumnMenu={closeAddColumnMenu}
          isAddColumnMenuOpen={isAddColumnMenuOpen}
        />
        <Contents timeline={timeline} />
        <AddColumnMenu
          accounts={accounts}
          isOpen={isAddColumnMenuOpen}
          close={closeAddColumnMenu}
          onCreate={(account, type) => console.log(account)}
        />
      </div>
    );
  }
}
