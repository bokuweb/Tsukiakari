import React, { Component } from 'react';
import ItemSelector from './item-selector';
import AccountSelector from './account-selector';
import B from '../lib/bem';

const b = B.with('add-column-menu');

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
            ? b('', { 'is-open': true })
            : b();
    return (
      <div className={wrapperClass}>
        <div className={b('header')} >
          <i className={`${b('icon', { header: true })} lnr lnr-cog`} />
          <span className={b('title')}>Add new column</span>
          <i className={`${b('icon', { close: true })} lnr lnr-cross`} onClick={this.props.close} />
        </div>
        {this.renderItemSelector()}
        {this.renderAccountSelector()}
      </div>
    );
  }
}

