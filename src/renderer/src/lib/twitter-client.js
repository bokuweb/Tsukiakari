import T from 'twit';
// import T from 'twitter';

import { remote } from 'electron';
import log from '../lib/log';

export default class TwitterClient {
  constructor(accessToken, accessTokenSecret) {
    this.client = new T({
      consumer_key: remote.getGlobal('consumerKey'),
      consumer_secret: remote.getGlobal('consumerSecret'),
      // access_token_key: accessToken,
      access_token: accessToken,
      access_token_secret: accessTokenSecret,
      timeout_ms: 60 * 1000,
    });
  }

  stream(method, params) {
    return this.client.stream(method, params);
  }

  getEndpoint(type) {
    log.debug('fetch type');
    log.debug(type);
    switch (type) {
      case 'Home' : return 'statuses/home_timeline';
      case 'Favorite' : return 'favorites/list';
      case 'Mention' : return 'statuses/mentions_timeline';
      case 'Search' : return 'search/tweets';
      default: throw new Error('Unknown fetch type');
    }
  }

  fetch(type, params) {
    const endpoint = this.getEndpoint(type);
    return new Promise((resolve, reject) => {
      this.client.get(
        endpoint,
        params,
        (error, tweets) => {
          if (error) reject(error);
          else resolve(tweets);
        });
    });
  }

  uploadMedia(params) {
    return new Promise((resolve, reject) => {
      this.client.post(
        'media/upload',
        { media_data: params.media },
        (error, res) => {
          if (error) reject(error);
          else resolve(res);
        });
    });
  }

  postTweet(params) {
    return new Promise((resolve, reject) => {
      this.client.post(
        'statuses/update',
        params,
        (error, tweet) => {
          if (error) reject(error);
          else resolve(tweet);
        });
    });
  }

  destroyTweet(params) {
    return new Promise((resolve, reject) => {
      this.client.post(
        'statuses/destroy',
        params,
        (error) => {
          if (error) reject(error);
          else resolve();
        });
    });
  }

  createFavorite(params) {
    return new Promise((resolve, reject) => {
      this.client.post(
        'favorites/create',
        params,
        (error, tweets) => {
          if (error) reject(error);
          else resolve(tweets);
        });
    });
  }

  createRetweet(params) {
    return new Promise((resolve, reject) => {
      this.client.post(
        'statuses/retweet',
        params,
        (error, tweets) => {
          if (error) reject(error);
          else resolve(tweets);
        });
    });
  }

  destroyFavorite(params) {
    return new Promise((resolve, reject) => {
      this.client.post(
        'favorites/destroy',
        params,
        (error, tweets) => {
          if (error) reject(error);
          else resolve(tweets);
        });
    });
  }

  getStatus(id) {
    return new Promise((resolve, reject) => {
      this.client.get(
        'statuses/show',
        { id, include_my_retweet: true },
        (error, status) => {
          if (error) reject(error);
          else resolve(status);
        });
    });
  }

  getUser(id, name) {
    return new Promise((resolve, reject) => {
      this.client.get(
        'users/show',
        { user_id: id, screen_name: name },
        (error, user) => {
          if (error) reject(error);
          else resolve(user);
        });
    });
  }

  getFriends(params) {
    return new Promise((resolve, reject) => {
      this.client.get(
        'friends/list',
        params,
        (error, followers) => {
          if (error) reject(error);
          else resolve(followers);
        });
    });
  }

  destroyFriendship(params) {
    return new Promise((resolve, reject) => {
      this.client.post(
        'friendships/destroy',
        params,
        (error, user) => {
          if (error) reject(error);
          else resolve(user);
        });
    });
  }
  /*
  getProfile(params) {
    var d = Q.defer();
    this._client.get('account/verify_credentials', params, (error, account, response) => {
      if (error) {
        console.log(util.inspect(error));
        d.reject(error);
      }
      return d.resolve(account);
    });
    return d.promise;
  }

  searchTweet(params) {
    var d = Q.defer();
    this._client.get('search/tweets', params, (error, tweets, response) => {
      if (error) {
        console.log(util.inspect(error));
        d.reject(error);
      }
      return d.resolve(tweets.statuses);
    });
    return d.promise;
  }


  searchTweet(params) {
    var d = Q.defer();
    this._client.get('search/tweets', params, (error, tweets, response) => {
      if (error) {
        console.log(util.inspect(error));
        d.reject(error);
      }
      return d.resolve(tweets.statuses);
    });
    return d.promise;
  }

  postTweet(params) {
    var d = Q.defer();
    this._client.post('statuses/update', params, (error, tweet, response) => {
      if (error) {
        console.log(util.inspect(error));
        d.reject(error);
      }
      return d.resolve(tweet);
    });
    return d.promise;
  }

  postRetweet(params) {
    var d = Q.defer();
    this._client.post('statuses/retweet', params, (error, tweet) => {
      if (error) {
        console.log(util.inspect(error));
        d.reject(error);
      }
      return d.resolve(tweet);
    });
    return d.promise;
  }

  destroyTweet(params) {
    var d = Q.defer();
    this._client.post('statuses/destroy', params, (error) => {
      if (error) {
        console.log(util.inspect(error));
        d.reject(error);
      }
      return d.resolve();
    });
    return d.promise;
  }
   */
}
