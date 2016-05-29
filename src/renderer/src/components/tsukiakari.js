import React, { Component, PropTypes } from 'react';
import AccountsContainer from '../containers/accounts';
import ContentsContainer from '../containers/contents';
import AddColumnMenuContainer from '../containers/add-column-menu';
import LightboxContainer from '../containers/lightbox';
import SidemenuContainer from '../containers/sidemenu';
import TweetWindowContainer from '../containers/tweet-window';
import Spinner from './spinner';
import bem from '../lib/bem';

const b = bem.with('tsukiakari');

export default class Tsukiakari extends Component {
  static propTypes = {
    actions: PropTypes.object.isRequired,
    accounts: PropTypes.object,
    lightbox: PropTypes.object,
  };

  componentWillMount() {
    this.props.actions.accounts.loadAccounts();
  }

  render() {
    const {
      accounts: { accounts },
      lightbox: { isLightBoxOpen },
    } = this.props;

    if (accounts.length === 0) return <Spinner style={{ padding: '20p% 0 0 0' }} />;
    return (
      <div className={b(null, { blur: isLightBoxOpen })}>
        <AccountsContainer />
        <SidemenuContainer />
        <ContentsContainer />
        <AddColumnMenuContainer />
        <LightboxContainer showImageCount={false} />
        <TweetWindowContainer />
      </div>
    );
  }
}
