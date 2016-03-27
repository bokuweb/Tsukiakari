import React, { Component, PropTypes } from 'react';
import AccountSelector from './account-selector';
import ItemSelector from './item-selector';

export default class AddColumnMenu extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    close: PropTypes.func.isRequired,
    accounts: PropTypes.array,
  };

  static defaultProps = {
    isOpen: false,
    accounts: [],
  }

  constructor(props) {
    super(props);
    this.onAccountSelect = ::this.onAccountSelect;
    this.onItemSelect = ::this.onItemSelect;
  }

  onAccountSelect(account) {
    console.dir(account);
  }

  onItemSelect(items) {
    console.dir(items);
  }

  render() {
    const wrapperClass = this.props.isOpen ? 'add-column-menu add-column-menu--is-open'
                                           : 'add-column-menu';
    return (
      <div className={wrapperClass}>
        <div className="add-column-menu__header" >
          <i className="add-column-menu__icon--header lnr lnr-cog" />
          <span className="add-column-menu__title">Add new column</span>
          <i className="add-column-menu__icon--close lnr lnr-cross" onClick={this.props.close} />
        </div>
        <AccountSelector accounts={this.props.accounts} onSelect={this.onAccountSelect} />
        <ItemSelector onSelect={this.onItemSelect} />
      </div>
    );
  }
}

