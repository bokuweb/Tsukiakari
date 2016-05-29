import React, { Component, PropTypes } from 'react';
import AccountsContainer from '../containers/accounts';
import Contents from './contents';
import AddColumnMenuContainer from '../containers/add-column-menu';
import LightboxContainer from '../containers/lightbox';
import SidemenuContainer from '../containers/sidemenu';
import TweetWindow from './tweet-window';
import bem from '../lib/bem';

const b = bem.with('tsukiakari');

export default class Tsukiakari extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    accounts: PropTypes.object,
    tweets: PropTypes.object,
    sidemenu: PropTypes.object,
    lightbox: PropTypes.object,
  };

  constructor(props) {
    super(props);
    this.deleteRequest = ::this.deleteRequest;
  }

  componentWillMount() {
    this.props.actions.accounts.loadAccounts();
  }

  deleteRequest(id, timerId) {
    this.props.actions.column.deleteColumn(id, timerId);
  }

  render() {
    const {
      actions,
      tweets: { timeline, columns },
      accounts: { accounts },
      sidemenu: { isTweetWindowOpen, replyTweet, replyAccount },
      lightbox: { isLightBoxOpen },
    } = this.props;

    const {
      openAddColumnMenu,
      closeTweetWindow,
    } = actions.sidemenu;

    const tweetActions = actions.tweets;
    const { openLightBox } = actions.lightbox;

    if (accounts.length === 0) return null;
    return (
      <div className={b(null, { blur: isLightBoxOpen })}>
        <AccountsContainer />
        <SidemenuContainer />
        <Contents
          accounts={accounts}
          columns={columns}
          timeline={timeline}
          openAddColumnMenu={openAddColumnMenu}
          openLightBox={openLightBox}
          deleteRequest={this.deleteRequest}
          {...tweetActions}
        />
        <AddColumnMenuContainer />
        <LightboxContainer showImageCount={false} />
        <TweetWindow
          isOpen={isTweetWindowOpen}
          accounts={accounts}
          post={tweetActions.postTweet}
          close={closeTweetWindow}
          replyTweet={replyTweet}
          replyAccount={replyAccount}
        />
      </div>
    );
  }
}
