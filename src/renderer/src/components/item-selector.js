import React, { Component, PropTypes } from 'react';

export default class AccountSelector extends Component {
  static propTypes = {
    onChange: PropTypes.func,
  };

  static defaultProps = {

  }

  renderItems() {
    if (!this.props.items) return null;
    return this.props.items.map(item => {
      const onChange = this.props.onChange.bind(this, item.value);
      return (
        <li className="item-selector__li" key={item.value}>
          <input
            type="checkbox"
            checked={item.checked}
            name={item.value}
            value={item.value}
            onChange={onChange}
          />
          <i className={`item-selector__icon--list ${item.icon}`} />
          <span className="item-selector__text">{item.value}</span>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="item-selector" >
        <div className="item-selector__title-wrapper" >
          <i className="item-selector__icon--users fa fa-check-square-o" />
          <span className="item-selector__title">Item</span>
          <span className="item-selector__name">@selected_account</span>
        </div>
        <div className="item-selector__items" >
          <ul className="item-selector__ul">
            {this.renderItems()}
          </ul>
        </div>
      </div>
    );
  }
}
