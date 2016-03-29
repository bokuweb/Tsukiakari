import React, { Component, PropTypes } from 'react';
import { Button } from 'react-bulma';
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
  }, {
    value: 'Mention',
    icon: 'fa fa-at',
    checked: false,
  }, {
    value: 'Search',
    icon: 'lnr lnr-magnifier',
    checked: false,
    input: false,
  }, {
    value: 'User',
    icon: 'lnr lnr-user',
    checked: false,
    input: false,
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

  onItemClick(value) {
    console.log(value);
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
        <ItemSelector
          onClick={this.onItemClick}
          items={defaultItems}
          style={{ marginTop: '10px' }}
        />
        {/*<div className="add-column-menu__bottons">
          <Button>Add</Button>
          <Button>Cancel</Button>
        </div> */}
      </div>
    );
  }
}

