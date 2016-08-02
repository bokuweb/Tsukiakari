// flow-typed signature: 007257c3559a38bd4af7ab85a2bff7e1
// flow-typed version: 5e1c1576ae/redux-actions_v0.9.x/flow_>=v0.23.x

declare module 'redux-actions' {
  declare function createAction(type: string, payloadCreator?: Function, metaCreator?: Function): Function;
  declare function handleAction(type: string, reducer: Object|Function): void;
  declare function handleActions(reducerMap: Object, defaultState?: Object): void;
}
