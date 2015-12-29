import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Tsukiakari from '../components/tsukiakari';
//import * as feedActions from '../actions/feed';

function mapStateToProps(state)  {
  return state;
}

function mapDispatchToProps(dispatch) {
  const actions = _.assign({}, {});
  return bindActionCreators(actions, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tsukiakari);
