import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Sidemenu from '../components/thin-sidemenu';
import * as sidemenu from '../actions/sidemenu';

function mapStateToProps(state: State): Props {
  return {
    columns: state.tweets.columns,
    ...state.sidemenu,
  };
}

function mapDispatchToProps(dispatch: Dispatch): Props {
  return {
    openAddColumnMenu: bindActionCreators(sidemenu.openAddColumnMenu, dispatch),
    closeAddColumnMenu: bindActionCreators(sidemenu.closeAddColumnMenu, dispatch),
    openTweetWindow: bindActionCreators(sidemenu.openTweetWindow, dispatch),
    closeTweetWindow: bindActionCreators(sidemenu.closeTweetWindow, dispatch),
    openSideMenu: bindActionCreators(sidemenu.openSideMenu, dispatch),
    closeSideMenu: bindActionCreators(sidemenu.closeSideMenu, dispatch),
  };
}

function mergeProps(stateProps: Props, dispatchProps: Props, ownProps: Props): Props {
  return {
    ...ownProps,
    ...stateProps,
    ...dispatchProps,
    onMenuClick: stateProps.isSideMenuOpen
      ? dispatchProps.closeSideMenu
      : dispatchProps.openSideMenu,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(Sidemenu);
