import React, { Component, PropTypes } from 'react';
import Lightbox from 'react-images';
import Accounts from './accounts';
import Sidemenu from './sidemenu';
import Contents from './contents';
import AddColumnMenu from './add-column-menu';
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
      actions,
      tweets: { timeline, columns },
      accounts: { accounts },
      sidemenu: { isAddColumnMenuOpen, isTweetWindowOpen, replyTweet, replyAccount },
      lightbox: { isLightBoxOpen, images, currentImage },
    } = this.props;

    const {
      openAddColumnMenu,
      closeAddColumnMenu,
      openTweetWindow,
      closeTweetWindow,
    } = actions.sidemenu;

    const tweetActions = actions.tweets;
    const {
      openLightBox,
      closeLightBox,
      showNextImage,
      showPrevImage,
    } = actions.lightbox;

    return (
      <div className={b(null, { blur: isLightBoxOpen })}>
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
          columns={columns}
          timeline={timeline}
          openAddColumnMenu={openAddColumnMenu}
          openLightBox={openLightBox}
          deleteRequest={this.deleteRequest}
          {...tweetActions}
        />
        <AddColumnMenu
          accounts={accounts}
          isOpen={isAddColumnMenuOpen}
          close={closeAddColumnMenu}
          onCreate={this.onCreate}
        />
        <Lightbox
          images={images}
          isOpen={isLightBoxOpen}
          showImageCount={false}
          onClickPrev={showPrevImage}
          onClickNext={showNextImage}
          onClose={closeLightBox}
          currentImage={currentImage}
        />
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
