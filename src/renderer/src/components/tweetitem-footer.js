import React, { Component, PropTypes } from 'react';

export default class TweetItemFooter extends Component {
  static propTypes = {
    tweet: PropTypes.object,
    createFavorite: PropTypes.object,
  };

  shouldComponentUpdate(nextProps) {
    return this.props.tweet.id !== nextProps.tweet.id;
  }

  render() {
    const { tweet } = this.props;
    return (
      <div className="tweetitem-footer">
        <span className="tweetitem-footer__icon-wrapper">
          <i className="tweetitem-footer__icon fa fa-reply" />
        </span>
        <span className="tweetitem-footer__icon-wrapper">
          <i className="tweetitem-footer__icon fa fa-retweet" />
          {tweet.retweet_count || ''}
        </span>
        <span className="tweetitem-footer__icon-wrapper">
          <i
            className="tweetitem-footer__icon tweetitem-footer__icon--favorite fa fa-heart"
            onClick={() => this.props.createFavorite(this.props.accounts[0], tweet.id_str)}
          />
          {tweet.favorite_count || ''}
        </span>
      </div>
    );
  }
}
