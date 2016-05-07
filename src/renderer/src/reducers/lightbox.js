import { handleActions } from 'redux-actions';

const defaultState = {
  images: [],
  isLightBoxOpen: false,
  currentImage: 0,
};

export default handleActions({
  OPEN_LIGHTBOX: (state, action) => ({
    images: action.payload.images,
    isLightBoxOpen: true,
    currentImage: action.payload.number || 0,
  }),
  CLOSE_LIGHTBOX: () => defaultState,
  SHOW_NEXT_IMAGE: state => ({
    ...state,
    currentImage: state.currentImage + 1,
  }),
  SHOW_PREV_IMAGE: state => ({
    ...state,
    currentImage: state.currentImage - 1,
  }),
}, defaultState);

