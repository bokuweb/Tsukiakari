/* @flow */

import React, { Component } from 'react';
import { Input, Addons, Button } from 're-bulma';
import B from '../lib/bem';

const b = B.with('add-column-search-form');

type Props = {
  onBackClick: Function;
  onSearchClick: Function;
  onChange: Function;
};

export default class SearchForm extends Component {
  static defaultProps = {
    items: [],
  }

  /* eslint-disable react/sort-comp */
  props: Props;

  render(): ?React$Element<*> {
    return (
      <div className={b()}>
        <div className={b('title-wrapper')} >
          <span className={b('title')}>Search</span>
        </div>
        <Addons color="isInfo" >
          <Input
            placeholder="search"
            icon="fa fa-search"
            hasIconRight
            onChange={this.props.onChange}
          />
          <Button onClick={this.props.onSearchClick}>Search</Button>
        </Addons>
        <div className={b('button-wrapper')} >
          <Button onClick={this.props.onBackClick}>Back</Button>
        </div>
      </div>
    );
  }
}
