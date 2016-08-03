import React, { Component } from 'react';

export default class ItemSelector extends Component {
  static defaultProps = {
    items: [],
  }

  renderItems() {
    return this.props.items.map(item => {
      const onClick = this.props.onClick.bind(this, item.value);
      return (
        <li className="item-selector__li" key={item.value} onClick={onClick}>
          <i className={`item-selector__icon--list ${item.icon}`} />
          <span className="item-selector__text">{item.value}</span>
        </li>
      );
    });
  }

  render() {
    return (
      <div className="item-selector" style={this.props.style}>
        <div className="item-selector__title-wrapper" >
          <i className="item-selector__icon--users lnr lnr-list" />
          <span className="item-selector__title">Column type</span>
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
