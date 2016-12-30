/* @flow */

import React, { PureComponent } from 'react';
import B from '../lib/bem';
import {
  default as Video,
  Controls,
  Mute,
  Seek,
  Time,
  Overlay,
} from 'react-html5video';

const b = B.with('fullscreen-video');

type Props = {
  direction: string;
  sources: any[];
  close: () => {};
};

export default class FullscreenVideo extends PureComponent {
  constructor(props: Props) {
    super(props);
  }

  props: Props;

  render(): ?React$Element<*> {
    return (
      <div
        className={b()}
        onClick={this.props.close}
      >
        <div className={b('video-wrapper')}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Video
            className={b('video', { 'is-vertical': this.props.direction === 'vertical' })}
            controls
          >
            {this.props.sources.map(s => <source src={s.url} />)}
            <Overlay />
            <Controls>
              <Seek />
              <Time />
              <Mute />
            </Controls>
          </Video>
        </div>
      </div>
    );
  }
}
