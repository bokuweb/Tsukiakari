import React, { Component, PropTypes } from 'react';
import NotificationContainer from '../containers/notification';
import AccountsContainer from '../containers/accounts';
import ContentsContainer from '../containers/contents';
import AddColumnMenuContainer from '../containers/add-column-menu';
import LightboxContainer from '../containers/lightbox';
import SidemenuContainer from '../containers/sidemenu';
import TweetWindowContainer from '../containers/tweet-window';
import Spinner from './spinner';
import bem from '../lib/bem';
import { whyDidYouUpdate } from 'why-did-you-update';

if (process.env.NODE_ENV !== 'production') {
  whyDidYouUpdate(React);
  window.Perf = require('react-addons-perf');
}

const b = bem.with('tsukiakari');

export default class Tsukiakari extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired,
    isLightBoxOpen: PropTypes.bool,
    accountLength: PropTypes.number,
  };

  componentWillMount() {
    this.props.initialize();
  }

  render() {
    if (this.props.accountLength === 0) return <Spinner style={{ padding: '10% 0 0 80px' }} />;
    return (
      <div className={b(null, { blur: this.props.isLightBoxOpen })}>
        <AccountsContainer />
        <SidemenuContainer />
        <ContentsContainer />
        <AddColumnMenuContainer />
        <LightboxContainer
          showImageCount={false}
          backdropClosesModal
        />
        <TweetWindowContainer />
        <NotificationContainer />
      </div>
    );
  }
}
