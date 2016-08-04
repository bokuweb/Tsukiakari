/* @flow */

import React, { PureComponent } from 'react';
import { Editor, EditorState } from 'draft-js';
import B from '../lib/bem';

const b = B.with('tweet-editor');

type Props = {
  onChange: Function,
};

type State = {
  editorState: Object,
};


export default class TweetEditor extends PureComponent {
  constructor(props: Props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = this.onChange.bind(this);
  }

  state: State;
  props: Props;
  onChange: Function;

  onChange(editorState: Object) {
    this.setState({ editorState });
    this.props.onChange(editorState.getCurrentContent().getPlainText());
  }

  render(): ?React$Element<*> {
    const { editorState } = this.state;
    return (
      <div className={b()}>
        <Editor
          editorState={editorState}
          placeholder="What's happening?"
          onChange={this.onChange}
          spellCheck
        />
      </div>
    );
  }
}
