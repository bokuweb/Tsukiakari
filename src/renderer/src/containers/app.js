import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Tsukiakari from '../components/tsukiakari';
import * as accounts from '../actions/accounts';


function mapStateToProps(state)  {
  return state;
}

function mapDispatchToProps(dispatch) {
  return {
    actions :{
      accounts: bindActionCreators(accounts, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tsukiakari);
