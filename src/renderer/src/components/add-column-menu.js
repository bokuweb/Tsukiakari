import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bulma';
import ColumnTitle from './column-title';
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
    this.state = {
      title: '',
    };
    this.onTitleChange = ::this.onTitleChange;
    this.onAccountSelect = ::this.onAccountSelect;
    this.onItemChange = ::this.onItemChange;
  }

  onTitleChange(title) {
    console.log(title)
    this.setState({ title });
  }

  onAccountSelect(id) {
    console.dir(id);
  }

  onItemChange(value) {
    console.dir(value);
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
        <ItemSelector onChange={this.onItemChange} />
        <div className="add-column-menu__bottons">
          <Button>Add</Button>
          <Button>Cancel</Button>
        </div>
      </div>
    );
  }
}

