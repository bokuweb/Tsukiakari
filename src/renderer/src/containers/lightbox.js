import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Lightbox from 'react-images';
import * as lightbox from '../actions/lightbox';

function mapStateToProps(state) {
  return {
    images: state.lightbox.images,
    currentImage: state.lightbox.currentImage,
    isOpen: state.lightbox.isLightBoxOpen,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    onClose: bindActionCreators(lightbox.closeLightBox, dispatch),
    onClickNext: bindActionCreators(lightbox.showNextImage, dispatch),
    onClickPrev: bindActionCreators(lightbox.showPrevImage, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lightbox);
