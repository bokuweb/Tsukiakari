import React, { Component } from 'react';
import Timeline from './timeline';
import { isEqual } from 'lodash';
import B from '../lib/bem';

const b = B.with('timeline-box');

export default class TimelineBox extends Component {
  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.onClose = ::this.onClose;
  }

  shouldComponentUpdate(nextProps) {
    return !isEqual(this.props, nextProps);
  }

  onMouseDown(e) {
    e.stopPropagation();
  }

  onClose() {
    const { column } = this.props;
    this.props.deleteRequest(column.id, column.timerId);
  }

  render() {
    const { id, title, icon, subTitle, results } = this.props.column;
    return (
      <div className={b()}>
        <div className={b('wrapper', { title: true })}>
          <span className={b('title')}>
            <i className={`${b('icon', { title: true })} ${icon}`} />
            <span>{title}</span>
            <span className={b('username')}>
              {subTitle}
            </span>
          </span>
          <i className={`${b('icon')} lnr lnr-cog`} />
          <i
            className={`${b('icon')} lnr lnr-cross`}
            onMouseDown={this.onMouseDown}
            onClick={this.onClose}
          />
        </div>
        <Timeline
          ref="timeline"
          id={id}
          results={results}
          timeline={this.props.timeline}
          accounts={this.props.accounts}
        />
      </div>
    );
  }
}
