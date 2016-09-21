/* @flow */

import { handleActions } from 'redux-actions';

import type { Action } from 'redux';

type State = {
  sources: Array<string>;
  currentTime: number;
  isFullscreen: bool;
}

const defaultState = {
  sources: [],
  isFullscreen: false,
  currentTime: 0,
};

export default handleActions({
  // FIXME:
  SHOW_FULLSCREEN_VIDEO: (state: State, action: Action): State => {
    const { sources, currentTime } = action.payload;
    return {
      ...state,
      sources,
      currentTime,
      isFullscreen: true,
    };
  },
  HIDE_FULLSCREEN_VIDEO: (): State => defaultState,
}, defaultState);

