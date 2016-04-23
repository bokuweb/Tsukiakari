import React, { Component, PropTypes } from 'react';
import Accounts from './accounts';
import Sidemenu from './sidemenu';
import Contents from './contents';
import AddColumnMenu from './add-column-menu';
import TweetWindow from './tweet-window';

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
    this.props.actions.accounts.loadAccounts();
  }

  onCreate(account, type) {
    this.props.actions.sidemenu.closeAddColumnMenu();
    this.props.actions.column.addColumn(account, type);
  }

  deleteRequest(id, timerId) {
    this.props.actions.column.deleteColumn(id, timerId);
  }

  render() {
    const {
      tweets: { timeline, columns },
      accounts: { accounts },
      sidemenu: { isAddColumnMenuOpen, isTweetWindowOpen },
    } = this.props;
    const {
      openAddColumnMenu, closeAddColumnMenu,
      openTweetWindow, closeTweetWindow,
    } = this.props.actions.sidemenu;
    const { createFavorite, postTweet } = this.props.actions.tweets;
    return (
      <div className="container">
        <Accounts accounts={accounts} />
        <Sidemenu
          columns={columns}
          openAddColumnMenu={openAddColumnMenu}
          closeAddColumnMenu={closeAddColumnMenu}
          isAddColumnMenuOpen={isAddColumnMenuOpen}
          openTweetWindow={openTweetWindow}
        />
        <Contents
          accounts={accounts}
          timeline={timeline}
          columns={columns}
          openAddColumnMenu={openAddColumnMenu}
          deleteRequest={this.deleteRequest}
          createFavorite={createFavorite}
        />
        <AddColumnMenu
          accounts={accounts}
          isOpen={isAddColumnMenuOpen}
          close={closeAddColumnMenu}
          onCreate={this.onCreate}
        />
        <TweetWindow
          isOpen={isTweetWindowOpen}
          accounts={accounts}
          post={postTweet}
          close={closeTweetWindow}
        />
      </div>
    );
  }
}
