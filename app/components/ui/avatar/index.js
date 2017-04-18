// @flow

import React from 'react';
import { Image } from 'semantic-ui-react';
import styles from './avatar.css';

export type Size = 'mini' | 'tiny' | 'small' | 'medium' | 'large' | 'big' | 'huge' | 'massive';

type props = {
  src: string;
  size?: number;
}

export default (props: Props) => (
  <Image
    size={props.size}
    src={props.src}
    avatar
  />
);
