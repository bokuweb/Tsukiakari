/* @flow */

import React, { Component } from 'react';
import ItemSelector from './item-selector';
import AccountSelector from './account-selector';
import SearchForm from './add-column-search-form';
import B from '../lib/bem';
import { isEqual } from 'lodash';
import Timeline from './add-column-menu-timeline';
// import log from '../lib/log';

import type { Account } from '../../../types/account';
import type { LoadingStatus } from '../../../types/common';

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
  searchedTweets: Object;
  searchTweetsWord: string;
  tweetLoadingStatus: LoadingStatus;
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

  shouldComponentUpdate(nextProps: Props, nextState: State): bool {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
  }

  onCreate(account: Account) {
    const params = this.state.columnType === 'Search'
          ? { q: this.props.searchTweetsWord }
          : {};
    this.props.onCreate(account, this.state.columnType, params);
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
    const { searchedTweets: { result }, tweetLoadingStatus } = this.props;
    if (!this.state.showSearchForm) return null;
    return (
      <SearchForm
        onBackClick={this.onBack}
        onSearchClick={this.onSearch}
        onChange={this.onSearchFormChange}
        onCreate={() => this.onCreate(this.props.accounts[0])}
        enableAddButton={result.Length !== 0 && tweetLoadingStatus === 'loaded'}
      />
    );
  }

  renderSearchTimeline(): ?React$Element<*> {
    if (!this.state.showSearchForm) return null;
    const { result, entities } = this.props.searchedTweets;
    return (
      <Timeline
        title={`'${this.props.searchTweetsWord}' timeline`}
        result={result}
        tweets={entities.tweets}
        loadingStatus={this.props.tweetLoadingStatus}
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
          <span className={b('title')}>Add new column</span>
          <i className={`${b('icon', { close: true })} lnr lnr-cross`} onClick={this.props.close} />
        </div>
        {this.renderItemSelector()}
        {this.renderAccountSelector()}
        {this.renderSearchForm()}
        {this.renderSearchTimeline()}
      </div>
    );
  }
}

