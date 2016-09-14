import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TweetItemFooter from '../components/tweetitem-footer';
import * as tweets from '../actions/tweets';

function mapStateToProps(state, props) {
  const tweet = (state.tweets.timeline[props.timelineKey] &&
                 state.tweets.timeline[props.timelineKey].entities.tweets[props.id]) ||
          state.addColumnMenu.searchedTweets.entities.tweets[props.id];
  return {
    tweet,
    accounts: state.accounts.accounts,
    favorited: tweet.favorited,
    favorite_count: tweet.favorite_count,
    retweeted: tweet.retweeted,
    retweet_count: tweet.retweet_count,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    ...bindActionCreators(tweets, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TweetItemFooter);
