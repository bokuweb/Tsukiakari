import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Tsukiakari from '../components/tsukiakari';
import * as accounts from '../actions/accounts';

function mapStateToProps(state) {
  return {
    accountLength: state.accounts.accounts.length,
    isLightBoxOpen: state.lightbox.isLightBoxOpen,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadAccounts: bindActionCreators(accounts.loadAccounts, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tsukiakari);

