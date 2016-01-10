import React, { Component } from 'react';

export default class TweetItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { tweet } = this.props;
    return (
      <div className="tweetitem">
        <div className="tweetitem__wrapper--avatar">
          <img className="tweetitem__image--avatar" src={tweet.user.profile_image_url} />
        </div>
        <div className="tweetitem__wrapper--text">
          <div>
            <span className="tweetitem__username">{tweet.user.name}</span>
            <span className="tweetitem__screenname">@{tweet.user.screen_name}</span>
          </div>
          <span className="tweetitem__text--tweet">{tweet.text}</span>
        </div>
      </div>
    );
  }
}
