/* @flow */

import React, { Component } from 'react';
import Button from './button';
import B from '../lib/bem';

import type { Item } from '../../../types/add-column-menu';

const b = B.with('item-selector');

type Props = {
  items: Array<$Shape<Item>>;
  onClick: Function;
  style: Object;
};

export default class ItemSelector extends Component {
  static defaultProps = {
    items: [],
  }

  /* eslint-disable react/sort-comp */
  props: Props;

  renderItems(): Array<React$Element<*>> {
    return this.props.items.map((item: Item): React$Element<*> => {
      const onClick = this.props.onClick.bind(this, item.value);
      return (
        <li key={item.value} style={{ listStyle: 'none' }}>
          <Button
            onClick={onClick}
            style={{ width: '220px', height: '40px', margin: '12px 0 0 24px' }}
          >
            <i className={`${b('icon', { list: true })} ${item.icon}`} />
            <span className={b('text')}>{item.value}</span>
          </Button>
        </li>
      );
    });
  }

  render(): ?React$Element<*> {
    return (
      <div className={b()} style={this.props.style}>
        <div className={b('title-wrapper')} >
          {/* <i className="item-selector__icon--users lnr lnr-list" /> */}
          <span className={b('title')}>Column type</span>
        </div>
        <div className={b('items')} >
          <ul className={b('ul')}>
            {this.renderItems()}
          </ul>
        </div>
      </div>
    );
  }
}
