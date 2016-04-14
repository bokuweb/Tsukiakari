import React, { Component, PropTypes } from 'react';
import ResizableAndMovable from 'react-resizable-and-movable';

const style = {
  backgroundColor: '#fff',
  position: 'absolute',
  top: '0',
  left: '0',
};

export default class ReactWindow extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.any,
    className: PropTypes.string,

  };

  static defaultProps = {
    className: '',
  };

  render() {
    return (
      <div
        style={
          this.props.isOpen ? {
            //zIndex: 9999,
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
          } : {
            display: 'none',
          }
        }
        className={this.props.className}
      >
        <ResizableAndMovable
          x={100}
          y={100}
          width={200}
          height={200}
          minWidth={200}
          minHeight={200}
          maxWidth={800}
          maxHeight={300}
          style={style}
          bounds="parent"
        >
          {this.props.children}
        </ResizableAndMovable>
      </div>
    );
  }
}
