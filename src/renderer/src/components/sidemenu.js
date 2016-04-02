import React, { Component, PropTypes } from 'react';

export default class Sidemenu extends Component {
  static propTypes = {
    openAddColumnMenu: PropTypes.func,
    closeAddColumnMenu: PropTypes.func,
    isAddColumnMenuOpen: PropTypes.bool,
    columns: PropTypes.array,
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
      <div className="sidemenu__button--addcolumn" onClick={this.onAddColumnClick}>
        <span>{icon}</span>
        <a className="sidemenu__text--add">{text}</a>
      </div>
    );
  }

  renderColumList() {
    return this.props.columns.map(column => (
      <li className="sidemenu__list">
        <i className={`sidemenu__icon ${column.icon}`} />
        <span className="sidemenu__text--list">{column.title}</span>
      </li>
    ));
  }

  render() {
    return (
      <div className="sidemenu">
        <div className="sidemenu__wrapper">
          <div className="sidemenu__logo-wrapper">
            <img className="sidemenu__logo" src="images/logo.png" />
          </div>
          <ul className="sidemenu__ul">
            {this.renderColumList()}
          </ul>
          {this.renderAddColumnButton()}
        </div>
        <div className="sidemenu__button--newtweet">
          <i className="sidemenu__icon lnr lnr-pencil" />
          <span className="sidemenu__text--newtweet">New Tweet</span>
        </div>
      </div>
    );
  }
}

