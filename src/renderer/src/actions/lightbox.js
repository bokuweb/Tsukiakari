import { createAction } from 'redux-actions';

export const openLightBox = (images, number) => (
  createAction('OPEN_LIGHTBOX')({ images, number })
);

export const closeLightBox = () => (
  createAction('CLOSE_LIGHTBOX')()
);

export const showNextImage = () => (
  createAction('SHOW_NEXT_IMAGE')()
);

export const showPrevImage = () => (
  createAction('SHOW_PREV_IMAGE')()
);
