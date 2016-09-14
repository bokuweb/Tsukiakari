import React from 'react';

declare module 'draft-js' {
  declare var Editor: React.Component<*, *, *>;
  declare var EditorState: Object;
  declare var ContentState: Object;
}
