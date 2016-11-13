/* @flow */

import React from 'react';
import { Button } from 're-bulma';

type Props = {
  children?: any;
  isDisabled?: bool;
  style?: Object;
  onClick?: Function;
};

export default function button(props: Props): ?React$Element<*> {
  return (
    <Button
      className="button"
      state={props.isDisabled ? 'isDisabled' : undefined}
      style={props.style}
      onClick={props.onClick}
    >
     {props.children}
    </Button>
  );
}
