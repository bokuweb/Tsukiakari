import React, { Component } from 'react';

export default class Sidemenu extends Component {
  render() {
    return (
      <div className="sidemenu">
        <div className="sidemenu__wrapper">
          <div className="sidemenu__logo-wrapper">
            <img className="sidemenu__logo" src="images/logo.png" />
          </div>
          <ul className="sidemenu__ul">
            <li className="sidemenu__list">
              <i className="sidemenu__icon icon-home" />
              <span className="sidemenu__text--list">Home</span>
            </li>
            <li className="sidemenu__list">
              <i className="sidemenu__icon icon-heart-empty" />
              <span className="sidemenu__text--list">Favorite</span>
            </li>
            <li className="sidemenu__list">
              <i className="sidemenu__icon fa fa-at" />
              <span className="sidemenu__text--list">Mentions</span>
            </li>
            <li className="sidemenu__list">
              <i className="sidemenu__icon icon-list-alt" />
              <span className="sidemenu__text--list">List</span>
            </li>
          </ul>
          <div className="sidemenu__button--addcolumn">
            <i className="sidemenu__icon icon-plus" />
            <span className="sidemenu__text--newtweet">Add column</span>
          </div>
        </div>
        <div className="sidemenu__button--newtweet">
          <i className="sidemenu__icon icon-twitter" />
          <span className="sidemenu__text--newtweet">New Tweet</span>
        </div>
      </div>
    );
  }
}

