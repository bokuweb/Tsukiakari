/* @flow */

import React from 'react';
import { Input, Addons, Button } from 're-bulma';

type Props = {
  children?: any;
  style?: Object;
  onClick?: Function;
  onChange?: Function;
  className?: string
};

export default function searchBox(props: Props): ?React$Element<*> {
  return (
    <Addons color="isInfo" className={props.className}>
      <Input
        placeholder="search"
        icon="lnr lnr-magnifier"
        hasIconRight
        onChange={props.onChange}
      />
      <Button
        onClick={props.onClick}
      >
        <i className="lnr lnr-magnifier" />
      </Button>
    </Addons>
  );
}
