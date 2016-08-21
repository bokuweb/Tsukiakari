/* eslint-disable no-constant-condition */

import T from '../lib/twitter-client';
import { eventChannel } from 'redux-saga';
import { fork, take, call, put, cancel } from 'redux-saga/effects';
import * as actions from '../actions/tweets';
import { normalize, Schema } from 'normalizr';
import { ipcRenderer } from 'electron'; // eslint-disable-line import/no-unresolved
import log from '../lib/log';

const tweetSchema = new Schema('tweets', { idAttribute: 'id_str' });

const showNotification = ({ body, icon }) => {
  log.debug(data);
  /* eslint-disable no-new */
  new Notification('Favorited', {
    body: `your tweet is favorited by ${data.source.name}`,
    icon: data.source.profile_image_url_https,
  });
};

const subscribe2 = (stream, account) => (
  eventChannel(emit => {
    const rejectStream = () => {
      stream.removeAllListeners('data');
      stream.removeAllListeners('error');
      stream.destroy();
    };

    stream.on('data', data => {
      log.debug('Recieve serach tweet.');
      log.debug(data);
    });

    ipcRenderer.once('suspend', () => {
      log.debug('suspend');
      rejectStream();
      log.debug('stream destroied');
    });

    ipcRenderer.once('resume', () => {
      log.debug('resume!!');
      const id = setInterval(() => {
        if (!navigator.onLine) return;
        clearInterval(id);
        emit(actions.connectStream({ account }));
      }, 3000);
    });
  })
);

const subscribe = (stream, account) => (
  eventChannel(emit => {
    const rejectStream = () => {
      stream.removeAllListeners('data');
      stream.removeAllListeners('error');
      stream.removeAllListeners('favorite');
      stream.removeAllListeners('end');
      stream.destroy();
    };

    stream.on('data', data => {
      if (data.friends) {

      } else if (data.event) {

      } else if (data.delete) {

      } else if (data.created_at) {
        if (data.retweeted_status && data.retweeted_status.user.id_str === account.id_str) {

        }
        window.requestIdleCallback(() => {
          emit(actions.recieveTweet({
            tweet: normalize(data, tweetSchema), account, type: 'Home',
          }));
        }, { timeout: 60000 });
      }
    });

    stream.on('favorite', (data) => {
      if (data.source.id_str !== account.id_str) {
        log.debug(data);
        /* eslint-disable no-new */
        new Notification('Favorited', {
          body: `your tweet is favorited by ${data.source.name}`,
          icon: data.source.profile_image_url_https,
        });
      }
    });

    stream.on('error', (error) => {
      log.error('Error occurred on stream', error);
      rejectStream();
      emit(actions.connectStream({ account, error }));
    });

    ipcRenderer.once('suspend', () => {
      log.debug('suspend');
      rejectStream();
      log.debug('stream destroied');
    });

    ipcRenderer.once('resume', () => {
      log.debug('resume!!');
      const id = setInterval(() => {
        if (!navigator.onLine) return;
        clearInterval(id);
        emit(actions.connectStream({ account }));
      }, 3000);
    });
  })
);

function connectUserStream({ accessToken, accessTokenSecret }) {
  const t = new T(accessToken, accessTokenSecret);
  return new Promise(resolve => {
    t.client.stream('user', stream => {
      resolve(stream);
    });
  });
}

function connectSearchStream2({ accessToken, accessTokenSecret }) {
  const t = new T(accessToken, accessTokenSecret);
  return new Promise(resolve => {
    t.client.stream('statuses/filter', { track: 'react' }, stream => {
      resolve(stream);
    });
  });
}

function* connectStream(account) {
  let channel;
  try {
    const stream = yield connectUserStream(account);
    channel = yield call(subscribe, stream, account);
  } catch (error) {
    log.log(error);
  }
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function* connectSearchStream(account) {
  let channel;
  try {
    const stream = yield connectSearchStream2(account);
    channel = yield call(subscribe2, stream, account);
  } catch (error) {
    log.log(error);
  }
  console.log('serach')
  while (true) {
    const action = yield take(channel);
    yield put(action);
  }
}

function* watchConnect() {
  const connection = {};
  while (true) {
    // FIXME:
    const { payload: { account } } = yield take('CONNECT_STREAM');
    if (connection[account.id]) yield cancel(connection[account.id]);
    connection[account.id] = yield fork(connectStream, account);
  }
}

function* watchConnectSearch() {
  const connection = {};
  while (true) {
    // FIXME:
    const { payload: { account } } = yield take('CONNECT_SEARCH_STREAM');
    console.log('asdasda')
    if (connection[account.id]) yield cancel(connection[account.id]);
    connection[account.id] = yield fork(connectSearchStream, account);
  }
}

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

export default function* tweetsSaga() {
  yield [
    fork(watchDestroyRetweet),
    fork(watchConnect),
    fork(watchConnectSearch),
    fork(watchMediaUpload),
  ];
}

