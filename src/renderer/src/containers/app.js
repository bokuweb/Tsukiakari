import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Tsukiakari from '../components/tsukiakari';
import * as accounts from '../actions/accounts';
import * as tweets from '../actions/tweets';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      accounts: bindActionCreators(accounts, dispatch),
      tweets: bindActionCreators(tweets, dispatch),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tsukiakari);
