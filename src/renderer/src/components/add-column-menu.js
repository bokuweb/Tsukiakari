import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bulma';
import ColumnTitle from './column-title';
import AccountSelector from './account-selector';
import ItemSelector from './item-selector';

const defaultItems = [
  {
    value: 'Home',
    icon: 'lnr lnr-home',
    checked: true,
  }, {
    value: 'Favorite',
    icon: 'lnr lnr-heart',
    checked: false,
  },
];

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
    this.state = {
      accountId: '',
      title: '',
      items: {},
    };
    this.onTitleChange = ::this.onTitleChange;
    this.onAccountSelect = ::this.onAccountSelect;
    this.onItemChange = ::this.onItemChange;
  }

  onTitleChange(title) {
    console.log(title)
    this.setState({ title });
  }

  onAccountSelect(accountId) {
    console.dir(accountId);
    this.setState({ accountId, items: { [accountId]: defaultItems } });
  }

  onItemChange(value) {
    const items = this.state.items[this.state.accountId].map(item => {
      if (item.value === value) {
        return Object.assign({}, item, { checked: !item.checked });
      }
      return item;
    });
    this.setState({ items: Object.assign({}, { [this.state.accountId]: items }) }, () => console.dir(this.state));
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
        <ColumnTitle onChange={this.onTitleChange} />
        <AccountSelector accounts={this.props.accounts} onSelect={this.onAccountSelect} />
        <ItemSelector onChange={this.onItemChange} items={this.state.items[this.state.accountId]} />
        <div className="add-column-menu__bottons">
          <Button>Add</Button>
          <Button>Cancel</Button>
        </div>
      </div>
    );
  }
}

