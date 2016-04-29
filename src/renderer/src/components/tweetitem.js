import React, { Component, PropTypes } from 'react';
import { B as b_ } from 'b_';
import TweetItemFooter from './tweetitem-footer';
import { link } from  'autolinker';
import { htmlEscape } from 'twitter-text';

const b = b_({
  tailSpace: ' ',
  elementSeparator: '__',
  modSeparator: '--',
  modValueSeparator: '-',
  classSeparator: ' ',
}).with('tweetitem');

export default class TweetItem extends Component {
  static propTypes = {
    accounts: PropTypes.array,
    tweet: PropTypes.object,
    createFavorite: PropTypes.func,
  };

  shouldComponentUpdate(nextProps) {
    return this.props.tweet.id_str !== nextProps.tweet.id_str;
  }

  renderUser(userName, screenName) {
    return (
      <div className={b('name-wrapper')}>
        <span className={b('username')}>
          {userName}
        </span>
        <span className={b('screenname')}>
          @{screenName}
        </span>
      </div>
    );
  }

  renderQuotedTweet() {
    const { tweet } = this.props;
    if (!tweet.quoted_status) return null;
    const userName = tweet.quoted_status.user.name;
    const screenName = tweet.quoted_status.user.screen_name;
    const { text } = tweet.quoted_status;
    return (
      <div className={b('quoted')}>
        {this.renderUser(userName, screenName)}
        <span className={b('text', { tweet: true })}>
          <span
            dangerouslySetInnerHTML={{
              __html: link(htmlEscape(text), { className: b('link') }),
            }}
          />
        </span>
      </div>
    );
  }

  renderFirstMedia(url, id) {
    return (
      <div className={b('media-wrapper', { [id]: true })}>
        <img
          className={b('media-image')}
          src={url}
        />
      </div>
    );
  }

  renderFirstMedia(url, id) {
    return (
      <div className={b('media-wrapper', { [id]: true })}>
        <img
          className={b('media-image')}
          src={url}
        />
      </div>
    );
  }

  renderMediaContents() {
    const entities = this.props.tweet.extended_entities;
    if (!entities || !entities.media) return null;
    if (entities.media.length === 1) {
      return (
        <div className={b('media')}>
          {this.renderFirstMedia(entities.media[0].media_url_https, 'single')}
        </div>
      );
    }
    if (entities.media.length === 2) {
      return (
        <div className={b('media')}>
          {this.renderFirstMedia(entities.media[0].media_url_https, 'double')}
          <div
            className={b('media-wrapper', { double: true })}
            style={{
              borderRadius: '0px 3px 3px 0px',
              background: `url(${entities.media[1].media_url_https})`,
              backgroundSize: 'cover',
            }}
          />
        </div>
      );
    }
    const first = entities.media.shift();
    return (
      <div className={b('media')}>
        <div className={b('media-wrapper', { left: true })}>
          <img
            className={b('media-image')}
            src={first.media_url_https}
          />
        </div>
        <div className={b('media-wrapper', { right: true })}>
          {
            entities.media.map(media => (
              <div
                style={{
                  width: '100%',
                  height: `calc(100% / ${entities.media.length})`,
                  flex: 1,
                  background: `url(${media.media_url_https})`,
                  backgroundSize: 'cover',
                }}
              />
            ))
          }
        </div>
      </div>
    );
  }

  renderRetweetedMessage() {
    const { tweet } = this.props;
    if (!tweet.retweeted_status) return null;
    return (
      <div className={b('retweeted')}>
        <i className={`${b('icon', { retweet: true })} fa fa-retweet`} />
        <span className={b('message', { retweeted: true })}>
          {tweet.user.name} Retweeted
        </span>
      </div>
    );
  }

  renderTweet(tweet, user, text) {
    return (
      <div className={b('body')}>
        <div className={b('wrapper', { avatar: true })}>
          <img
            className={b('image', { avatar: true })}
            src={user.profile_image_url}
          />
        </div>
        <div className={b('wrapper', { text: true })}>
          {this.renderUser(user.name, user.screen_name)}
          <span className={b('text', { tweet: true })}>
            <span
              dangerouslySetInnerHTML={{
                __html: link(htmlEscape(text), { className: b('link') }),
              }}
            />
          </span>
          {this.renderQuotedTweet()}
          {this.renderMediaContents()}
          <TweetItemFooter
            tweet={tweet}
            createFavorite={this.props.createFavorite}
            accounts={this.props.accounts}
          />
        </div>
      </div>
    );
  }

  renderTweetBody() {
    const { tweet } = this.props;
    return tweet.retweeted_status
      ? this.renderTweet(tweet, tweet.retweeted_status.user, tweet.retweeted_status.text)
      : this.renderTweet(tweet, tweet.user, tweet.text);
  }

  render() {
    return (
      <div className={b()}>
        {this.renderRetweetedMessage()}
        {this.renderTweetBody()}
      </div>
    );
  }
}
