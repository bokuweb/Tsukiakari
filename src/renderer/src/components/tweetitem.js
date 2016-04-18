import React, { Component, PropTypes } from 'react';

export default class TweetItem extends Component {
  static propTypes = {
    tweet: PropTypes.object,
  };

  shouldComponentUpdate(nextProps) {
    return this.props.tweet.id !== nextProps.tweet.id;
  }

  renderQuotedTweet() {
    const { tweet } = this.props;
    if (!tweet.quoted_status) return null;
    return (
      <div className="tweetitem__quoted">
        <div className="tweetitem__name-wrapper">
          <span className="tweetitem__username">
            {tweet.quoted_status.user.name}
          </span>
          <span className="tweetitem__screenname">
            @{tweet.quoted_status.user.screen_name}
          </span>
        </div>
        <span className="tweetitem__text--tweet">{tweet.quoted_status.text}</span>
      </div>
    );
  }

  renderRetweetedMessage() {
    const { tweet } = this.props;
    if (!tweet.retweeted_status) return null;
    return (
      <div className="tweetitem__retweeted">
        <i className="tweetitem__icon tweetitem__icon--retweet icon-retweet" />
        <span className="tweetitem__message tweetitem__message--retweeted">
          {tweet.user.name} Retweeted
        </span>
      </div>
    );
  }

  renderTweet(user, text) {
    return (
      <div className="tweetitem__body">
        <div className="tweetitem__wrapper tweetitem__wrapper--avatar">
          <img
            className="tweetitem__image tweetitem__image--avatar"
            src={user.profile_image_url}
          />
        </div>
        <div className="tweetitem__wrapper tweetitem__wrapper--text">
          <div className="tweetitem__name-wrapper">
            <span className="tweetitem__username">
              {user.name}
            </span>
            <span className="tweetitem__screenname">
              @{user.screen_name}
            </span>
          </div>
          <span className="tweetitem__text--tweet">{text}</span>
          {this.renderQuotedTweet()}
        </div>
      </div>
    );
  }

  renderTweetBody() {
    const { tweet } = this.props;
    if (tweet.retweeted_status) {
      return this.renderTweet(tweet.retweeted_status.user, tweet.retweeted_status.text);
    }
    return this.renderTweet(tweet.user, tweet.text);
  }

  render() {
    return (
      <div className="tweetitem">
        {this.renderRetweetedMessage()}
        {this.renderTweetBody()}
      </div>
    );
  }
}
