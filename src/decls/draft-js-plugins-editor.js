import React from 'react';

declare module 'draft-js-plugins-editor' {
  declare var Editor: React.Component<*, *, *>;
}
