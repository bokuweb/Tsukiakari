import React, { Component, PropTypes } from 'react';

export default class AccountSelector extends Component {
  static propTypes = {
    onSelect: PropTypes.func,
  };

  static defaultProps = {

  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="item-selector" >
        <div className="item-selector__title-wrapper" >
          <i className="item-selector__icon--users lnr lnr-file-add" />
          <span className="item-selector__title">Item</span>
          <span className="item-selector__name">@selected_account</span>
        </div>
        <div className="item-selector__items" >
          <ul className="item-selector__ul">
            <li className="item-selector__li">
              <input type="checkbox" name="home" value="home" />
              <i className="item-selector__icon--list lnr lnr-home" />
              <span className="item-selector__text">Home</span>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
