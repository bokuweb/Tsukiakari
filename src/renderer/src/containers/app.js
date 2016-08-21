import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Tsukiakari from '../components/tsukiakari';
import * as initialize from '../actions/initialize';

function mapStateToProps(state) {
  return {
    accountLength: state.accounts.accounts.length,
    isLightBoxOpen: state.lightbox.isLightBoxOpen,
    isSideMenuOpen: state.sidemenu.isSideMenuOpen,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    initialize: bindActionCreators(initialize.initialize, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tsukiakari);

