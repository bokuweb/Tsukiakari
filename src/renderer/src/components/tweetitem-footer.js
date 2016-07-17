import React, { Component } from 'react';
import { fromNow } from '../lib/formatTime';
import B from '../lib/bem';

const b = B.with('tweetitem-footer');

export default class TweetItemFooter extends Component {
  constructor(props) {
    super(props);
    this.onReply = ::this.onReply;
    this.onRetweet = ::this.onRetweet;
    this.onFavorite = ::this.onFavorite;
  }

  onReply() {
    const { tweet } = this.props;
    // TODO: Fix account
    this.props.reply({ account: this.props.accounts[0], tweet });
  }

  onRetweet() {
    const { tweet } = this.props;
    // TODO: Fix account
    if (this.props.retweeted) {
      this.props.destroyRetweet({ account: this.props.accounts[0], tweet });
    } else {
      this.props.createRetweet(this.props.accounts[0], tweet);
    }
  }

  onFavorite() {
    const { tweet } = this.props;
    if (this.props.favorited) {
      this.props.destroyFavorite(this.props.accounts[0], tweet);
    } else {
      this.props.createFavorite(this.props.accounts[0], tweet);
    }
  }

  render() {
    const { tweet } = this.props;
    return (
      <div className={b()}>
        <span className={b('icon-wrapper')}>
          <i
            className={`${b('icon', { reply: true })} fa fa-reply`}
            onClick={this.onReply}
          />
        </span>
        <span className={b('icon-wrapper')}>
          <i
            className={`${b('icon', { retweet: !this.props.retweeted || 'active' })} fa fa-retweet`}
            onClick={this.onRetweet}
          />
          {this.props.retweet_count || ''}
        </span>
        <span className={b('icon-wrapper')}>
          <i
            className={`${b('icon', { favorite: !this.props.favorited || 'active' })} fa fa-heart`}
            onClick={this.onFavorite}
          />
          {this.props.favorite_count || ''}
        </span>
        <span className={b('time')}>
          {fromNow(tweet.created_at)}
        </span>
      </div>
    );
  }
}
