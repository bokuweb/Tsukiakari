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

  constructor(props) {
    super(props);
    this.onCreate = ::this.onCreate;
    this.deleteRequest = ::this.deleteRequest;
  }

  componentWillMount() {
  //  const { fetchHome, fetchFavorites } = this.props.actions.tweets;
    this.props.actions.accounts.loadAccounts();
  //  setInterval(() => {
  //    if (this.props.accounts.accounts[0]) {
  //      fetchHome(this.props.accounts.accounts[0], 'Home');
  //      fetchFavorites(this.props.accounts.accounts[0], 'Favorite');
  //    }
  //  }, 60 * 1000);
  }

  //componentWillReceiveProps(nextProps) {
  //  const { fetchHome, fetchFavorites } = this.props.actions.tweets;
  //  if (isEmpty(this.props.accounts.accounts) && !isEmpty(nextProps.accounts.accounts)) {
  //    fetchHome(nextProps.accounts.accounts[0], 'Home');
  //    fetchFavorites(nextProps.accounts.accounts[0], 'Favorite');
  //  }
  //}

  onCreate(account, type) {
    this.props.actions.sidemenu.closeAddColumnMenu();
    this.props.actions.column.addColumn(account, type);
  }

  deleteRequest(id) {
    this.props.actions.column.deleteColumn(id);
  }

  render() {
    const {
      tweets: { timeline, columns },
      accounts: { accounts },
      sidemenu: { isAddColumnMenuOpen },
    } = this.props;
    const { openAddColumnMenu, closeAddColumnMenu } = this.props.actions.sidemenu;
    return (
      <div className="container">
        <Accounts accounts={accounts} />
        <Sidemenu
          columns={columns}
          openAddColumnMenu={openAddColumnMenu}
          closeAddColumnMenu={closeAddColumnMenu}
          isAddColumnMenuOpen={isAddColumnMenuOpen}
        />
        <Contents
          timeline={timeline}
          columns={columns}
          openAddColumnMenu={openAddColumnMenu}
          deleteRequest={this.deleteRequest}
        />
        <AddColumnMenu
          accounts={accounts}
          isOpen={isAddColumnMenuOpen}
          close={closeAddColumnMenu}
          onCreate={this.onCreate}
        />
      </div>
    );
  }
}
