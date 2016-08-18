/* @flow */

import React, { PureComponent } from 'react';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createEmojiPlugin from 'draft-js-emoji-plugin';
import createMentionPlugin, { defaultSuggestionsFilter } from 'draft-js-mention-plugin';
import B from '../lib/bem';

const b = B.with('tweet-editor');

type Props = {
  onChange: Function,
};

type State = {
  editorState: Object,
};

const mentionPlugin = createMentionPlugin({ mentionTrigger: '@', mentionPrefix: '@' });
const { MentionSuggestions } = mentionPlugin;

// Creates an Instance. At this step, a configuration object can be passed in
// as an argument.
const emojiPlugin = createEmojiPlugin({
  imagePath: 'http://cdn.jsdelivr.net/emojione/assets/svg/',
});

const { EmojiSuggestions } = emojiPlugin;

export default class TweetEditor extends PureComponent {
  constructor(props: Props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      suggestions: props.mentions,
    };
    this.onChange = this.onChange.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  state: State;
  props: Props;
  onChange: Function;

  onChange(editorState: Object) {
    this.setState({ editorState });
    this.props.onChange(editorState.getCurrentContent().getPlainText());
  }

  onSearchChange(e: SyntheticEvent): void { // eslint-disable-line flowtype/require-return-type
    this.setState({
      suggestions: defaultSuggestionsFilter(e.value, this.props.mentions),
    });
  }

  render(): ?React$Element<*> {
    const { editorState } = this.state;
    return (
      <div className={b()}>
        <Editor
          editorState={editorState}
          placeholder="What's happening?"
          onChange={this.onChange}
          plugins={[emojiPlugin, mentionPlugin]}
          spellCheck
        />
        <MentionSuggestions
          onSearchChange={this.onSearchChange}
          suggestions={this.state.suggestions}
        />
        <EmojiSuggestions />
      </div>
    );
  }
}
