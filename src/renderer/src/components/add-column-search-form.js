/* @flow */

import React, { Component } from 'react';
import Button from './button';
import SearchBox from './search-box';
import B from '../lib/bem';

const b = B.with('add-column-search-form');

type Props = {
  onBackClick: Function;
  onSearchClick: Function;
  onCreate: Function;
  onChange: Function;
  enableAddButton: bool;
  searchWord: string;
};

export default class SearchForm extends Component {

  /* eslint-disable react/sort-comp */
  props: Props;

  render(): ?React$Element<*> {
    return (
      <div className={b()}>
        <div className={b('title-wrapper')} >
          <span className={b('title')}>Search tweets</span>
        </div>
        <SearchBox
          className={b('form')}
          onChange={this.props.onChange}
          onClick={this.props.onSearchClick}
          value={this.props.searchWord}
        />
        <div className={b('button-wrapper')} >
          <Button
            onClick={this.props.onBackClick}
            style={{ margin: '0 6px 0 0' }}
          >
            Back
          </Button>
          <Button
            onClick={this.props.onCreate}
            isDisabled={!this.props.enableAddButton}
          >
            Add
          </Button>
        </div>
      </div>
    );
  }
}
