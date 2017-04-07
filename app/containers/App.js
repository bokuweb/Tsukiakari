// @flow
import React, { Component } from 'react';
import { Titlebar } from 'react-titlebar-osx';
import { remote } from 'electron';
import type { Children } from 'react';

export default class App extends Component {
  props: {
    children: Children
  };

  render() {
    const win = remote.getCurrentWindow();
    return (
      <div>
        <Titlebar
          draggable
          onClose={() => win.close()}
          onMaximize={() => win.maximize()}
          onFullscreen={() => win.setFullScreen(true)}
          onMinimize={() => win.minimize()}
        />
        {this.props.children}
      </div>
    );
  }
}
