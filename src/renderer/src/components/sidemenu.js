import React, { Component, PropTypes } from 'react';

export default class Sidemenu extends Component {
  static propTypes = {
    openAddColumnMenu: PropTypes.func,
    closeAddColumnMenu: PropTypes.func,
    isAddColumnMenuOpen: PropTypes.bool,
  };

  static defaultProps = {
    openAddColumnMenu: () => null,
    closeAddColumnMenu: () => null,
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

  render() {
    return (
      <div className="sidemenu">
        <div className="sidemenu__wrapper">
          <div className="sidemenu__logo-wrapper">
            <img className="sidemenu__logo" src="images/logo.png" />
          </div>
          <ul className="sidemenu__ul">
            <li className="sidemenu__list">
              <i className="sidemenu__icon lnr lnr-home" />
              <span className="sidemenu__text--list">Home</span>
            </li>
            <li className="sidemenu__list">
              <i className="sidemenu__icon lnr lnr-heart" />
              <span className="sidemenu__text--list">Favorite</span>
            </li>
            <li className="sidemenu__list">
              <i className="sidemenu__icon fa fa-at" />
              <span className="sidemenu__text--list">Mentions</span>
            </li>
            <li className="sidemenu__list">
              <i className="sidemenu__icon lnr lnr-list" />
              <span className="sidemenu__text--list">List</span>
            </li>
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

