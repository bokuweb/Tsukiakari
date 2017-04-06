// @flow
import React, { Component } from 'react';
import { Titlebar } from 'react-titlebar-osx';
import type { Children } from 'react';

export default class App extends Component {
  props: {
    children: Children
  };

  render() {
    return (
      <div>
        <Titlebar
          text="Awesome tool"
          draggable
          onClose={() => this.handleClose()}
          onMaximize={() => this.handleMaximize()}
          onFullscreen={() => this.handleFullscreen()}
          onMinimize={() => this.handleMinimize()}
        />
        {this.props.children}
      </div>
    );
  }
}
