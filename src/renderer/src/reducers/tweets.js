import * as types from '../constants/action-types';

const defaultState = {
  timeline: []
};

export default function tweets(state=defaultState, action) {
  switch(action.type){
  case types.FETCH_TIMELINE :
    const {tweets} = action;
    return Object.assign({}, state, {timeline: tweets});
  default:
    return state;
  }
}
