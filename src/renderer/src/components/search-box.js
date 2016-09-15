/* @flow */

import React, { Component } from 'react';
import { Input, Addons, Button } from 're-bulma';

type Props = {
  children?: any;
  style?: Object;
  onClick?: Function;
  onSubmit?: Function;
  onChange?: Function;
  className?: string;
  value?: string;
};

export default class SearchBox extends Component {
  constructor(props: Props) {
    super(props);
    this.isFocus = false;
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  /* eslint-disable react/sort-comp */
  isFocus: bool;
  onFocus: Function;
  onBlur: Function;
  onKeyDown: Function;
  input: React$Element<*>;

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown(e: SyntheticKeyboardEvent) {
    if (e.key === 'Enter' && this.isFocus) {
      this.props.onSubmit();
    }
  }

  onFocus() {
    this.isFocus = true;
  }

  onBlur() {
    this.isFocus = false;
  }

  render(): React$Element<*> {
    return (
      <Addons color="isInfo" className={this.props.className}>
        <Input
          ref={(c: React$Element<*>) => { this.input = c; }}
          placeholder="search"
          icon="lnr lnr-magnifier"
          hasIconRight
          onChange={this.props.onChange}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          defaultValue={this.props.value}
        />
        <Button
          onClick={this.props.onClick}
        >
          <i className="lnr lnr-magnifier" />
        </Button>
      </Addons>
    );
  }
}
