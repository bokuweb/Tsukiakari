import React, { Component, PropTypes } from 'react';
import ResizableAndMovable from 'react-resizable-and-movable';
import AccountList from './account-list';
import { Button } from 'react-bulma';

const style = {
  backgroundColor: '#fff',
  position: 'absolute',
  top: '0',
  left: '0',
  pointerEvents: 'auto', // HACK:
};

export default class TweetWindow extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.any,
    className: PropTypes.string,
    accounts: PropTypes.array,
  };

  static defaultProps = {
    className: '',
    accounts: [],
  };

  onSelect() {

  }

  render() {
    return (
      <div
        style={
          this.props.isOpen ? {
            pointerEvents: 'none', // HACK:
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
          className="tweet-window"
        >
          <div className="tweet-window__title-wrapper">
            <span className="tweet-window__title">
              <i className="tweet-window__icon fa fa-twitter" />
              New Tweet
            </span>
            <i className="tweet-window__icon lnr lnr-cross" />
          </div>
          <div className="tweet-window__body">
            <span className="tweet-window__item-title">From</span>
            {
              this.props.accounts.length === 0
                ? <div>loading</div>
                : <AccountList accounts={this.props.accounts} />
            }
            <span className="tweet-window__item-title">Tweet</span>
            <div><textarea className="tweet-window__textarea" /></div>
            <Button
               style={{ marginLeft: 'auto', width: '100px', display: 'block' }}
            >
              Tweet
            </Button>
          </div>
        </ResizableAndMovable>
      </div>
    );
  }
}
