import React, { Component, PropTypes } from 'react';
import B from '../lib/bem';
import { decodeHtml } from '../utils/utils';
import TweetItemFooter from './tweetitem-footer';
import { link } from 'autolinker';
import { htmlEscape } from 'twitter-text';
import { default as Video, Controls, Play, Mute, Seek, Time, Overlay } from 'react-html5video';
import Tooltip from 'rc-tooltip';
import AccountTooltip from './account-tooltip';

const b = B.with('tweetitem');

export default class TweetItem extends Component {
  static propTypes = {
    accounts: PropTypes.array,
    tweet: PropTypes.object,
    createFavorite: PropTypes.func,
    destroyFavorite: PropTypes.func,
    reply: PropTypes.func,
    openLightBox: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = { destroyTooltip: false };
    this.onAccountClick = ::this.onAccountClick;
  }

  onAccountClick() {
    
  }

  onImageClick(index) {
    const entities = this.props.tweet.extended_entities;
    if (!entities || !entities.media) return null;
    const images = entities.media.map(media => ({ src: media.media_url_https }));
    return this.props.openLightBox(images, index);
  }

  replaceLink(linker, match) {
    switch (match.getType()) {
      case 'url' :
        return true;
      case 'email':
      case 'phone': return false;
      case 'twitter' :
        console.log('Twitter Handle: ', match.getTwitterHandle());
        // return '<a href="http://newplace.to.link.twitter.handles.to/">' + match.getTwitterHandle() + '</a>';
        return false;
      case 'hashtag' :
        console.log('Hashtag: ', match.getHashtag());
        // return '<a href="http://newplace.to.link.hashtag.handles.to/">' + match.getHashtag() + '</a>';
        return false;
      default: return false;
    }
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
              __html: link(htmlEscape(decodeHtml(text)),
              { className: b('link'), replaceFn: this.replaceLink }),
            }}
          />
        </span>
      </div>
    );
  }

  renderFirstMedia(url, id) {
    const onClick = this.onImageClick.bind(this, 0);
    return (
      <div className={b('media-wrapper', { [id]: true })} onClick={onClick}>
        <img
          className={b('media-image')}
          src={url}
        />
      </div>
    );
  }

  renderRestMedias(media) {
    return (
      <div className={b('media-wrapper', { right: true })}>
        {
          media.map((m, i) => {
            const onClick = this.onImageClick.bind(this, i + 1);
            return (
              <div
                key={i}
                onClick={onClick}
                style={{
                  width: '100%',
                  height: `calc(100% / ${m.length})`,
                  flex: 1,
                  background: `url(${m.media_url_https})`,
                  backgroundSize: 'cover',
                }}
              />
            );
          })
        }
      </div>
    );
  }

  renderVideo(video) {
    return (
      <div className={b('media')}>
        <Video className={b('video')} controls>
          { video.variants.map(variant => <source src={variant.url} />) }
        <Overlay />
        <Controls>
          <Play />
          <Seek />
          <Time />
          <Mute />
        </Controls>
        </Video>
      </div>
    );
  }

  renderImages(entities) {
    if (entities.media.length === 1) {
      return (
        <div className={b('media')}>
          {this.renderFirstMedia(entities.media[0].media_url_https, 'single')}
        </div>
      );
    }
    if (entities.media.length === 2) {
      const onClick = this.onImageClick.bind(this, 1);
      return (
        <div className={b('media')}>
          {this.renderFirstMedia(entities.media[0].media_url_https, 'double')}
          <div
            className={b('media-wrapper', { double: true })}
            onClick={onClick}
            style={{
              borderRadius: '0px 3px 3px 0px',
              background: `url(${entities.media[1].media_url_https})`,
              backgroundSize: 'cover',
            }}
          />
        </div>
      );
    }
    const media = [].slice.call(entities.media);
    const first = media.shift();
    const onClick = this.onImageClick.bind(this, 0);
    return (
      <div className={b('media')}>
        <div className={b('media-wrapper', { left: true })}>
          <img
            onClick={onClick}
            className={b('media-image')}
            src={first.media_url_https}
          />
        </div>
        {this.renderRestMedias(media)}
      </div>
    );
  }

  renderMediaContents() {
    const entities = this.props.tweet.extended_entities;
    if (!entities || !entities.media) return null;
    if (entities.media[0].video_info) return this.renderVideo(entities.media[0].video_info);
    return this.renderImages(entities);
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
        <div
          onMouseOver={() => this.setState({ destroyTooltip: false })}
          onMouseLeave={() => this.setState({ destroyTooltip: true })}
          className={b('wrapper', { avatar: true })}
        >
          <Tooltip
            trigger="hover"
            overlay={
              <AccountTooltip
                account={user}
                buttonText={user.following ? 'Unfollow' : 'Follow'}
                onButtonClick={this.removeAccount}
              />
            }
            destroyTooltipOnHide={this.state.destroyTooltip}
            placement="right"
            mouseLeaveDelay={0}
            overlayStyle={{
              position: 'absolute',
              left: '50px',
              zIndex: '9999',
            }}
          >
            <img
              className={b('image', { avatar: true })}
              src={user.profile_image_url}
            />
          </Tooltip>
        </div>
        <div className={b('wrapper', { text: true })}>
          {this.renderUser(user.name, user.screen_name)}
          <span className={b('text', { tweet: true })}>
            <span
              dangerouslySetInnerHTML={{
                __html: link(htmlEscape(decodeHtml(text)),
                { className: b('link'), replaceFn: this.replaceLink }),
              }}
            />
          </span>
          {this.renderQuotedTweet()}
          {this.renderMediaContents()}
          <TweetItemFooter
            tweet={tweet}
            createReply={this.props.createReply}
            createFavorite={this.props.createFavorite}
            createRetweet={this.props.createRetweet}
            destroyFavorite={this.props.destroyFavorite}
            destroyRetweet={this.props.destroyRetweet}
            reply={this.props.reply}
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
