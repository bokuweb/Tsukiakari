import { connect } from 'react-redux';
import Notification from '../components/notification';

function mapStateToProps(state) {
  return {
    notification: state.notification,
  };
}

export default connect(
  mapStateToProps,
)(Notification);
