import React, { Component, PropTypes } from 'react';
import B from '../lib/bem';
import ResizableAndMovable from 'react-resizable-and-movable';
import AccountList from './account-list';
import { Button } from 'react-bulma';

const b = B.with('tweet-window');

const style = {
  backgroundColor: '#fff',
  position: 'absolute',
  top: '0px',
  left: '0px',
  pointerEvents: 'auto', // HACK:
};

export default class TweetWindow extends Component {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    children: PropTypes.any,
    className: PropTypes.string,
    accounts: PropTypes.array,
    close: PropTypes.func,
    post: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    accounts: [],
    close: () => null,
    post: () => null,
  };

  constructor(props) {
    super(props);
    this.state = {
      width: 380,
      height: 180,
      status: '',
    };
    this.onResize = ::this.onResize;
    this.onClick = ::this.onClick;
    this.onChange = ::this.onChange;
  }

  onSelect() {

  }

  onResize(_, size) {
    this.setState({ height: size.height });
  }

  onClick() {
    // FIXME: select account
    this.setState({ status: '' });
    this.props.post(this.props.accounts[0], this.state.status, this.props.replyTweet);
  }

  onChange({ target: { value } }) {
    this.setState({ status: value });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.replyTweet.id_str !== this.props.replyTweet.id_str) {
      this.setState({ status: `@${nextProps.replyTweet.user.screen_name}` });
    }
  }

  render() {
    console.timeEnd('close');
    return (
      <div
        style={
          this.props.isOpen ? {
            pointerEvents: 'none', // HACK:
            position: 'absolute',
            top: '0px',
            left: '0px',
            width: '100%',
            height: '100%',
          } : {
            display: 'none',
          }
        }
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
          className={b()}
          onResize={this.onResize}
        >
          <div className={b('title-wrapper')}>
            <span className={b('title')}>
              <i className={`${b('icon')} icon-tweet`} />
              New Tweet
            </span>
            <i
              className={`${b('icon')} lnr lnr-cross`}
              onClick={this.props.close}
            />
          </div>
          <div className={b('body')}>
            {
              this.props.accounts.length === 0
                ? <div>loading</div>
                : <AccountList accounts={this.props.accounts} />
            }
            <div className={b('textarea-wrapper')}>
              <textarea
                onChange={this.onChange}
                style={{ height: this.state.height - 96 }}
                value={this.state.status}
                placeholder="What's happening?"
                readOnly={false}
                className={b('textarea')}
              />
              <Button
                onClick={this.onClick}
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
