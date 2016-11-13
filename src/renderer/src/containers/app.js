import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Tsukiakari from '../components/tsukiakari';
import * as initialize from '../actions/initialize';
import { hideFullscreenVideo } from '../actions/video';

function mapStateToProps(state) {
  return {
    accountLength: state.accounts.accounts.length,
    isLightBoxOpen: state.lightbox.isLightBoxOpen,
    isSideMenuOpen: state.sidemenu.isSideMenuOpen,
    video: state.video,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initialize: bindActionCreators(initialize.initialize, dispatch),
    hideFullscreenVideo: bindActionCreators(hideFullscreenVideo, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tsukiakari);

