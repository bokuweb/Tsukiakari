import React, { PureComponent } from 'react';
import Notification from '../containers/notification';
import Accounts from '../containers/accounts';
import Contents from '../containers/contents';
import AddColumnMenu from '../containers/add-column-menu';
import Lightbox from '../containers/lightbox';
import Sidemenu from '../containers/sidemenu';
import TweetWindow from '../containers/tweet-window';
import Spinner from './spinner';
import bem from '../lib/bem';
import { whyDidYouUpdate } from 'why-did-you-update';

if (process.env.NODE_ENV !== 'production') {
  // whyDidYouUpdate(React);
}

const b = bem.with('tsukiakari');

export default class Tsukiakari extends PureComponent {
  componentWillMount() {
    this.props.initialize();
  }

  render() {
    if (this.props.accountLength === 0) {
      return <Spinner style={{ padding: '10% 0 0 80px' }} />;
    }
    return (
      <div className={b(null, { blur: this.props.isLightBoxOpen })}>
        <div
          style={{
            display: 'flex',
            width: this.props.isSideMenuOpen ? '420px' : '72px',
            transition: 'width 0.2s',
            willChange: 'width',
            overflow: 'hidden',
          }}
        >
          <Accounts />
          <Sidemenu />
        </div>
        <Contents />
        <AddColumnMenu />
        <Lightbox
          showImageCount={false}
          backdropClosesModal
        />
        <TweetWindow />
        <Notification />
      </div>
    );
  }
}
