import React, { PureComponent } from 'react';
import Notification from '../containers/notification';
import Accounts from '../containers/accounts';
import Contents from '../containers/contents';
import AddColumnMenu from '../containers/add-column-menu';
import Lightbox from '../containers/lightbox';
import Sidemenu from '../containers/sidemenu';
import ThinSidemenu from '../containers/thin-sidemenu';
import TweetWindow from '../containers/tweet-window';
import Video from '../components/fullscreen-video';
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

  renderMenu() {
    if (this.props.isSideMenuOpen) {
      return (
        <div className={b('menu-wrapper')}>
          <Accounts />
          <Sidemenu />
        </div>
      );
    }
    return (
      <ThinSidemenu />
    );
  }

  render() {
    if (this.props.accountLength === 0) {
      return <Spinner style={{ padding: '10% 0 0 80px' }} />;
    }
    const isBlur = this.props.isLightBoxOpen || this.props.video.isFullscreen;
    return (
      <div className={b()}>
        <div className={b(null, { blur: isBlur })}>
          <div
            style={{
              display: 'flex',
              minWidth: this.props.isSideMenuOpen ? '280px' : '60px',
              transition: 'min-width 0.15s',
              willChange: 'min-width',
              overflow: 'hidden',
              backgroundColor: '#233749',
            }}
          >
            {this.renderMenu()}
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
        {this.props.video.isFullscreen
          ? <Video {...this.props.video} close={this.props.hideFullscreenVideo}/>
          : null}
      </div>
    );
  }
}
