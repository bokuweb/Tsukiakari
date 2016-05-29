import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Sidemenu from '../components/sidemenu';
import * as sidemenu from '../actions/sidemenu';

function mapStateToProps(state) {
  return {
    columns: state.tweets.columns,
    isAddColumnMenuOpen: state.sidemenu.isAddColumnMenuOpen,
    isTweetWindowOpen: state.sidemenu.isTweetWindowOpen,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openAddColumnMenu: bindActionCreators(sidemenu.openAddColumnMenu, dispatch),
    closeAddColumnMenu: bindActionCreators(sidemenu.closeAddColumnMenu, dispatch),
    openTweetWindow: bindActionCreators(sidemenu.openTweetWindow, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidemenu);
