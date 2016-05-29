import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Accounts from '../components/accounts';
import * as accounts from '../actions/accounts';

function mapStateToProps(state) {
  return {
    accounts: state.accounts.accounts,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addAccount: bindActionCreators(accounts.addAccount, dispatch),
    removeAccount: bindActionCreators(accounts.removeAccount, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Accounts);
