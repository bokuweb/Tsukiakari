/* @flow */

import React from 'react';
import { Button } from 're-bulma';

type Props = {
  children?: any;
  isDisabled?: bool;
  style?: Object;
  onClick?: Function;
};

const style = {
  color: '#4f5f6d',
  border: 'solid 1px #4f5f6d',
  borderRadius: '2px',
  background: 'none',
};

export default function button(props: Props): ?React$Element<*> {
  return (
    <Button
      className="button"
      state={props.isDisabled ? 'isDisabled' : undefined}
      style={{ ...style, ...props.style }}
      onClick={props.onClick}
    >
     {props.children}
    </Button>
  );
}
