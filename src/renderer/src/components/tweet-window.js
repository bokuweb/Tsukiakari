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
    close: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    accounts: [],
    close: () => null,
  };

  constructor(props) {
    super(props);
    this.state = {
      width: 380,
      height: 180,
    };
  }

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
          width={this.state.width}
          height={this.state.height}
          minWidth={280}
          minHeight={150}
          maxWidth={800}
          maxHeight={600}
          style={style}
          bounds="parent"
          className="tweet-window"
          onResize={(_, size) => this.setState({ height: size.height })}
        >
          <div className="tweet-window__title-wrapper">
            <span className="tweet-window__title">
              <i className="tweet-window__icon icon-tweet" />
              New Tweet
            </span>
            <i
              className="tweet-window__icon lnr lnr-cross"
              onClick={this.props.close}
            />
          </div>
          <div className="tweet-window__body">
            {
              this.props.accounts.length === 0
                ? <div>loading</div>
                : <AccountList accounts={this.props.accounts} />
            }
            <div className="tweet-window__textarea-wrapper">
              <textarea
                style={{ height: this.state.height - 96 }}
                defaultValue=""
                placeholder="What's happening?"
                readOnly={false}
                className="tweet-window__textarea"
              />
              <Button
                style={{ margin: '10px 14px 0 auto', width: '80px', display: 'block' }}
              >
                <i className="icon-tweet" /> Tweet
              </Button>
            </div>
          </div>
        </ResizableAndMovable>
      </div>
    );
  }
}
