import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Tsukiakari from '../components/tsukiakari';
import * as accounts from '../actions/accounts';
import * as tweets from '../actions/tweets';
import * as sidemenu from '../actions/sidemenu';
import * as column from '../actions/column';
import * as lightbox from '../actions/lightbox';

function mapStateToProps(state) {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    actions: {
      accounts: bindActionCreators(accounts, dispatch),
      tweets: bindActionCreators(tweets, dispatch),
      sidemenu: bindActionCreators(sidemenu, dispatch),
      column: bindActionCreators(column, dispatch),
      lightbox: bindActionCreators(lightbox, dispatch),
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tsukiakari);
