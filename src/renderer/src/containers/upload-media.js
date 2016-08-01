/* @flow */

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UploadMedia from '../components/upload-media';
import { deleteMedia } from '../actions/upload-media';

import type { Dispatch } from 'redux';

function mapStateToProps(): Object {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch): Object {
  return {
    deleteMedia: bindActionCreators(deleteMedia, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UploadMedia);
