/* eslint-disable no-constant-condition */

import T from '../lib/twitter-client';
import { fork, take, call, put, select } from 'redux-saga/effects';
import * as actions from '../actions/tweets';
import { successSearchTweets, failSearchTweets } from '../actions/add-column-menu';
import log from '../lib/log';
import { getFirstAccount } from './selector';
import watchConnectFilterStream from './filter-stream';
import watchConnectUserStream from './user-stream';

function readMedia(file) {
  return new Promise((resolve, reject) => {
    log.debug('read media file');
    const reader = new FileReader();
    reader.onload = (() => {
      log.debug('media reading complete');
      resolve(reader.result.replace('data:image/png;base64,', ''));
    });
    // TODO: support multiple files
    reader.readAsDataURL(file);
  });
}

function* watchMediaUpload() {
  while (true) {
    const { payload: { account, files } } = yield take('UPLOAD_MEDIA');
    const { accessToken, accessTokenSecret } = account;
    const twitter = new T(accessToken, accessTokenSecret);
    log.debug('==== upload files ====');
    log.debug(files);
    // TODO: support multiple files
    if (!files[0] || !/^image\//.test(files[0].type)) {
      yield put(actions.failUploadMedia());
      continue;
    }
    const media = yield readMedia(files[0]);
    try {
      const response = yield call(::twitter.uploadMedia, { media });
      yield put(actions.successUploadMedia({ response, file: files[0] }));
    } catch (error) {
      log.error(error);
      yield put(actions.failUploadMedia(error));
    }
  }
}

function* destroyRetweet(account, tweet) {
  const { accessToken, accessTokenSecret } = account;
  const twitter = new T(accessToken, accessTokenSecret);
  try {
    const status = yield call(::twitter.getStatus, tweet.id_str);
    yield call(::twitter.destroyTweet, { id: status.current_user_retweet.id_str });
    yield put(actions.successDestroyRetweet({ account, tweet }));
  } catch (error) {
    yield put(actions.failureDestroyRetweet({ account, tweet }));
  }
}

function* watchDestroyRetweet() {
  while (true) {
    const { payload: { account, tweet } } = yield take('REQUEST_DESTROY_RETWEET');
    yield fork(destroyRetweet, account, tweet);
  }
}

function* watchSearchTweetForMenu() {
  while (true) {
    const { payload: { word } } = yield take('SEARCH_TWEETS_FOR_MENU');
    const { accessToken, accessTokenSecret } = yield select(getFirstAccount);
    const twitter = new T(accessToken, accessTokenSecret);
    try {
      const tweets = yield call(::twitter.fetch, 'Search', { q: word });
      log.debug(tweets);
      yield put(successSearchTweets({ tweets: tweets.statuses }));
    } catch (error) {
      log.debug(error);
      yield put(failSearchTweets({ error }));
    }
  }
}

export default function* tweetsSaga() {
  yield [
    fork(watchDestroyRetweet),
    fork(watchConnectUserStream),
    fork(watchConnectFilterStream),
    fork(watchMediaUpload),
    fork(watchSearchTweetForMenu),
  ];
}

