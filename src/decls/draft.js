import React from 'react';

declare module 'draft-js' {
  declare var Editor: React.Component<*, *, *>;
  declare var EditorState: Object;
}
