/* @flow */

import React, { Component } from 'react';
import B from '../lib/bem';
import { isEqual } from 'lodash';

import type { Media } from '../../../types/media';

type Props = {
  media: Array<Media>,
  deleteMedia : Function,
};

const b = B.with('upload-media');

export default class UploadMedia extends Component {
  constructor(props: Object) {
    super(props);
    this.deleteMedia = this.deleteMedia.bind(this);
  }

  shouldComponentUpdate(nextProps: Object): bool {
    return !isEqual(this.props, nextProps);
  }

  props: Props;
  deleteMedia: Function;

  deleteMedia(e: SyntheticEvent): void { // eslint-disable-line flowtype/require-return-type
    // Dynamic Type Tests. See. https://flowtype.org/docs/dynamic-type-tests.html#_
    if (e.target instanceof HTMLElement) {
      this.props.deleteMedia({ id: e.target.dataset.id });
    }
  }

  renderMedia(): Array<React$Element<*>> {
    return this.props.media.map((m: Media, i: number): React$Element<*> => (
      <div
        key={i}
        className={b('media')}
        style={{ backgroundImage: `url('${m.path}')` }}
      >
        <i
          className={`${b('button', { close: true })} fa fa-close`}
          data-id={m.id}
          onClick={this.deleteMedia}
        />
      </div>
    ));
  }

  render(): ?React$Element<*> {
    if (this.props.media.length === 0) return null;
    return (
      <div className={b()} >
        {this.renderMedia()}
      </div>
    );
  }
}
