import React, { Component, PropTypes } from 'react';
import B from '../lib/bem';

const b = B.with('sidemenu');

export default class Sidemenu extends Component {
  static propTypes = {
    openAddColumnMenu: PropTypes.func,
    closeAddColumnMenu: PropTypes.func,
    isAddColumnMenuOpen: PropTypes.bool,
    isTweetWindowOpen: PropTypes.bool,
    columns: PropTypes.array,
    openTweetWindow: PropTypes.func,
  };

  static defaultProps = {
    openAddColumnMenu: () => null,
    closeAddColumnMenu: () => null,
    columns: [],
  }

  constructor(props) {
    super(props);
    this.onAddColumnClick = ::this.onAddColumnClick;
  }

  onAddColumnClick() {
    if (this.props.isAddColumnMenuOpen) {
      this.props.closeAddColumnMenu();
    } else {
      this.props.openAddColumnMenu();
    }
  }

  renderAddColumnButton() {
    const isOpen = this.props.isAddColumnMenuOpen;
    const text = isOpen ? 'Close menu' : 'Add new column';
    const icon = isOpen ? 'x' : '+';
    return (
      <div className={b('button', { addcolumn: true })} onClick={this.onAddColumnClick}>
        <span>{icon}</span>
        <a className={b('text', { add: true })}>{text}</a>
      </div>
    );
  }

  renderColumList() {
    return this.props.columns.map(column => (
      <li className={b('list')} key={column.id}>
        <i className={`${b('icon')} ${column.icon}`} />
        <span className={b('text', { list: true })}>
          {column.title}
          <span className={b('text', { name: true })}>
            @{column.contents[0].account.screen_name}
          </span>
        </span>
      </li>
    ));
  }

  renderTweetButtonText() {
    if (this.props.isTweetWindowOpen) {
      return (
        <div>
          <i className={`${b('icon')} lnr lnr-cross`} />
          <span className={b('text', { newtweet: true })}>Close Window</span>
        </div>
      );
    }
    return (
      <div>
        <i className={`${b('icon')} icon-tweet`} />
        <span className={b('text', { newtweet: true })}>New Tweet</span>
      </div>
    );
  }
  render() {
    return (
      <div className={b()}>
        <div className={b('wrapper')}>
          <div className={b('logo-wrapper')}>
            <img className={b('logo')} src="images/logo.png" />
          </div>
          <ul className={b('ul')}>
            {this.renderColumList()}
          </ul>
          {this.renderAddColumnButton()}
        </div>
        <div
          className={b('button', { newtweet: true })}
          onClick={this.props.openTweetWindow}
         >
          {this.renderTweetButtonText()}

        </div>
      </div>
    );
  }
}

