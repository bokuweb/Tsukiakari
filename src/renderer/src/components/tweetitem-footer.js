import React, { Component, PropTypes } from 'react';
import { B as b_ } from 'b_';

const b = b_({
  tailSpace: ' ',
  elementSeparator: '__',
  modSeparator: '--',
  modValueSeparator: '-',
  classSeparator: ' ',
}).with('tweetitem-footer');

export default class TweetItemFooter extends Component {
  static propTypes = {
    tweet: PropTypes.object,
    createFavorite: PropTypes.object,
    accounts: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.onFavorite = ::this.onFavorite;
  }

  shouldComponentUpdate(nextProps) {
    return this.props.tweet.id !== nextProps.tweet.id;
  }

  onFavorite() {
    const { tweet } = this.props;
    this.props.createFavorite(this.props.accounts[0], tweet.id_str);
  }

  render() {
    const { tweet } = this.props;
    return (
      <div className={b()}>
        <span className={b('icon-wrapper')}>
          <i className={`${b('icon')} fa fa-reply`} />
        </span>
        <span className={b('icon-wrapper')}>
          <i className={`${b('icon')} fa fa-retweet`} />
          {tweet.retweet_count || ''}
        </span>
        <span className={b('icon-wrapper')}>
          <i
            className={`${b('icon', { favorite: !tweet.favorited || 'active' })} fa fa-heart`}
            onClick={this.onFavorite}
          />
          {tweet.favorite_count || ''}
        </span>
      </div>
    );
  }
}
