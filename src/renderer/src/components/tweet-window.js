import React, { Component, PropTypes } from 'react';
import B from '../lib/bem';
import ResizableAndMovable from 'react-resizable-and-movable';
import Tooltip from 'rc-tooltip';
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
    replyTweet: PropTypes.object,
  };

  static defaultProps = {
    className: '',
    accounts: [],
    close: () => null,
    post: () => null,
    replyTweet: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      width: 380,
      height: 180,
      status: '',
      destroyTooltip: false,
      selectedAccount: props.accounts[0],
    };
    this.onResize = ::this.onResize;
    this.close = ::this.close;
    this.onDrag = ::this.onDrag;
    this.onClick = ::this.onClick;
    this.onChange = ::this.onChange;
    this.onAccountSelect = ::this.onAccountSelect;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.replyTweet.id_str !== this.props.replyTweet.id_str) {
      this.setState({ status: `@${nextProps.replyTweet.user.screen_name}` });
    }
    if (nextProps.isOpen !== this.props.isOpen) {
      this.setState({ destroyTooltip: true });
    }
  }

  onDrag() {
    this.setState({ destroyTooltip: true });
  }

  onAccountSelect(account) {
    this.setState({ selectedAccount: account, destroyTooltip: true });
  }

  onResize(_, size) {
    this.setState({ height: size.height, destroyTooltip: true });
  }

  onClick() {
    this.props.post(this.state.selectedAccount, this.state.status, this.props.replyTweet);
    this.setState({ status: '', destroyTooltip: true });
  }

  onChange({ target: { value } }) {
    this.setState({ status: value });
  }

  close() {
    this.props.close();
    this.setState({ destroyTooltip: true });
  }

  renderAvatar() {
    // TODO:
    if (!this.state.selectedAccount) return <span>loading</span>;
    return (
      <img
        src={this.state.selectedAccount.profile_image_url}
        className={b('avatar')}
      />
    );
  }

  renderAccount() {
    if (this.props.accounts.length === 0) return <i className="fa fa-spin fa-spinner" />;
    return (
      <Tooltip
        trigger="click"
        overlay={
          <div className={b('tooltip')}>
            <AccountList
              accounts={this.props.accounts}
              selectedAccount={this.state.selectedAccount}
              onSelect={this.onAccountSelect}
            />
          </div>
        }
        destroyTooltipOnHide={this.state.destroyTooltip}
        placement="bottom"
        mouseLeaveDelay={0}
        overlayStyle={{
          position: 'absolute',
          top: '5px',
          left: '50px',
          zIndex: '9999',
        }}
      >
        {this.renderAvatar()}
      </Tooltip>
    );
  }

  render() {
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
          onDrag={this.onDrag}
        >
          <div className={b('title-wrapper')}>
            <span className={b('title')}>
              <i className={`${b('icon')} icon-tweet`} />
              New Tweet
            </span>
            <i
              className={`${b('icon')} lnr lnr-cross`}
              onClick={this.close}
            />
          </div>
          <div className={b('body')}>
            { this.renderAccount() }
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
                style={{
                  margin: '10px 14px 0 auto',
                  width: '80px',
                  display: 'block',
                }}
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
