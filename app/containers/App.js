// @flow
import React, { Component } from 'react';
import { Titlebar } from 'react-titlebar-osx';
import { remote } from 'electron';
import type { Children } from 'react';

export default class App extends Component {

  props: {
    children: Children
  };

  constructor(props) {
    super(props);
    const win = remote.getCurrentWindow();
    this.state = {
      hideTitlebar: win.isFullScreen(),
    }
    win.on('enter-full-screen', (a) => {
      console.log(win.isFullScreen());
      this.setState({ hideTitlebar: win.isFullScreen()})
    })
    win.on('leave-full-screen', (a) => {
      console.log(win.isFullScreen());
      this.setState({ hideTitlebar: win.isFullScreen()})      
    })
  }

  render() {

    return (
      <div>
        <div className="titlebar" style={{ display: this.state.hideTitlebar ? "none" : "block"}}></div>
        {/*<Titlebar
          draggable
          onClose={() => win.close()}
          onMaximize={() => win.maximize()}
          onFullscreen={() => {
            win.setFullScreen(true);
          }}
          onMinimize={() => win.minimize()}
        />*/}
        {this.props.children}
      </div>
    );
  }
}
