import React, { Component, PropTypes } from 'react';
import ItemSelector from './item-selector';
import AccountSelector from './account-selector';

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

const defaultState = {
  columnType: null,
  showItemSelector: true,
  showAccount: false,
};

export default class AddColumnMenu extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    close: PropTypes.func.isRequired,
    accounts: PropTypes.array,
    onCreate: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isOpen: false,
    accounts: [],
  }

  constructor(props) {
    super(props);
    this.state = defaultState;
    this.onItemClick = ::this.onItemClick;
    this.onCreate = ::this.onCreate;
    this.onBack = ::this.onBack;
  }

  onCreate(account) {
    this.props.onCreate(account, this.state.columnType);
    this.setState(defaultState);
  }

  onItemClick(value) {
    this.setState({
      columnType: value,
      showItemSelector: false,
      showAccount: true,
    });
  }

  onBack() {
    this.setState(defaultState);
  }

  renderItemSelector() {
    if (!this.state.showItemSelector) return null;
    return (
      <ItemSelector
        onClick={this.onItemClick}
        items={defaultItems}
        style={{ marginTop: '10px' }}
      />
    );
  }

  renderAccountSelector() {
    if (!this.state.showAccount) return null;
    return (
      <AccountSelector
        accounts={this.props.accounts}
        onBackClick={this.onBack}
        onCreate={this.onCreate}
      />
    );
  }

  render() {
    const wrapperClass = this.props.isOpen
            ? 'add-column-menu add-column-menu--is-open'
            : 'add-column-menu';
    return (
      <div className={wrapperClass}>
        <div className="add-column-menu__header" >
          <i className="add-column-menu__icon--header lnr lnr-cog" />
          <span className="add-column-menu__title">Add new column</span>
          <i className="add-column-menu__icon--close lnr lnr-cross" onClick={this.props.close} />
        </div>
        {this.renderItemSelector()}
        {this.renderAccountSelector()}
      </div>
    );
  }
}

