import React, { Component } from 'react';

export default class Spinner extends Component {

  static defaultProps = {
    style: {},
  };

  render() {
    return (
      <div className="sk-folding-cube" style={this.props.style} >
        <div className="sk-cube1 sk-cube"></div>
        <div className="sk-cube2 sk-cube"></div>
        <div className="sk-cube4 sk-cube"></div>
        <div className="sk-cube3 sk-cube"></div>
      </div>
    );
  }
}
