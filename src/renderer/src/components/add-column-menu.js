/* @flow */

import React, { Component } from 'react';
import ItemSelector from './item-selector';
import AccountSelector from './account-selector';
import SearchForm from './add-column-search-form.js';
import B from '../lib/bem';

import type { Account } from '../../../types/account';

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
    // input: false,
  }, {
    value: 'User',
    icon: 'lnr lnr-user',
    checked: false,
    // input: false,
  },
];

const defaultState = {
  columnType: null,
  showItemSelector: true,
  showAccount: false,
  showSearchForm: false,
  searchWord: '',
};

const styles = {
  itemSelector: {
    marginTop: '10px',
  },
};

type Props = {
  isOpen: bool;
  accounts: Array<Account>;
  onCreate: Function;
  close: Function;
  searchTweets: Function;
};

type State = {
  columnType: ?string;
  showItemSelector: bool;
  showAccount: bool;
  showSearchForm: bool;
  searchWord: string;
};

export default class AddColumnMenu extends Component {
  static defaultProps = {
    isOpen: false,
    accounts: [],
  }

  /* eslint-disable react/sort-comp */
  props: Props;
  state: State;
  onItemClick: Function;
  onCreate: Function;
  onBack: Function;
  onSearch: Function;
  onSearchFormChange: Function;

  constructor(props: Props) {
    super(props);
    this.state = defaultState;
    this.onItemClick = this.onItemClick.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.onBack = this.onBack.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSearchFormChange = this.onSearchFormChange.bind(this);
  }

  onCreate(account: Account) {
    this.props.onCreate(account, this.state.columnType);
    this.setState(defaultState);
  }

  onItemClick(type: string) {
    const showAccount = type !== 'Search';
    const showSearchForm = type === 'Search';
    this.setState({
      columnType: type,
      showItemSelector: false,
      showAccount,
      showSearchForm,
    });
  }

  onBack() {
    this.setState(defaultState);
  }

  onSearch() {
    this.props.searchTweets({ word: this.state.searchWord });
  }

  onSearchFormChange(e: SyntheticEvent) {
    if (e.target instanceof HTMLInputElement) {
      this.setState({ searchWord: e.target.value });
    }
  }

  renderItemSelector(): ?React$Element<*> {
    if (!this.state.showItemSelector) return null;
    return (
      <ItemSelector
        onClick={this.onItemClick}
        items={defaultItems}
        style={styles.itemSelector}
      />
    );
  }

  renderAccountSelector(): ?React$Element<*> {
    if (!this.state.showAccount) return null;
    return (
      <AccountSelector
        accounts={this.props.accounts}
        onBackClick={this.onBack}
        onCreate={this.onCreate}
      />
    );
  }

  renderSearchForm(): ?React$Element<*> {
    if (!this.state.showSearchForm) return null;
    return (
      <SearchForm
        onBackClick={this.onBack}
        onSearchClick={this.onSearch}
        onChange={this.onSearchFormChange}
      />
    );
  }

  render(): ?React$Element<*> {
    const wrapperClass = this.props.isOpen
            ? b('', { 'is-open': true })
            : b();
    return (
      <div className={wrapperClass}>
        <div className={b('header')} >
          {/* <i className={`${b('icon', { header: true })} lnr lnr-cog`} /> */}
          <span className={b('title')}>Add new column</span>
          <i className={`${b('icon', { close: true })} lnr lnr-cross`} onClick={this.props.close} />
        </div>
        {this.renderItemSelector()}
        {this.renderAccountSelector()}
        {this.renderSearchForm()}
      </div>
    );
  }
}

