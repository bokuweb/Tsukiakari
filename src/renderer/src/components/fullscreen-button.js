/* @flow */
import React, { PureComponent } from 'react';

type Props = {
  show: Function;
  pause: Function;
  currentTime: number;
};

const style = {
  padding: '10px 8px 0 0',
};

export default class FullScreenButton extends PureComponent {
  constructor(props: Props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  /* eslint-disable react/sort-comp */
  props: Props;
  onClick: Function;

  onClick(): void {
    this.props.show(this.props.currentTime);
    this.props.pause();
  }

  render(): React$Element<*> {
    return (
      <div onClick={this.onClick} style={style}>
        <i className="lnr lnr-frame-expand" />
      </div>
    );
  }
}
