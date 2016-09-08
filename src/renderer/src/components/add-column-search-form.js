/* @flow */

import React, { Component } from 'react';
import { Input, Addons, Button } from 're-bulma';
import B from '../lib/bem';

const b = B.with('add-column-search-form');

type Props = {
  onBackClick: Function;
  onSearchClick: Function;
  onChange: Function;
  enableAddButton: bool;
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
          <span className={b('title')}>Search tweets</span>
        </div>
        <Addons color="isInfo" className={b('form')}>
          <Input
            placeholder="search"
            icon="lnr lnr-magnifier"
            hasIconRight
            onChange={this.props.onChange}
          />
          <Button
            onClick={this.props.onSearchClick}
          >
            <i className="lnr lnr-magnifier" />
          </Button>
        </Addons>
        <div className={b('button-wrapper')} >
          <Button
            style={{
              marginRight: '6px',
              color: '#4f5f6d',
              border: 'solid 1px #4f5f6d',
              borderRadius: '2px',
              background: 'none',
            }}
            onClick={this.props.onBackClick}
          >
            Back
          </Button>
          <Button
            state={this.props.enableAddButton ? undefined : 'isDisabled'}
            style={{
              color: '#4f5f6d',
              border: 'solid 1px #4f5f6d',
              borderRadius: '2px',
              background: 'none',
            }}
          >
            Add
          </Button>
        </div>
      </div>
    );
  }
}
