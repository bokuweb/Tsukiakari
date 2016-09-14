import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TweetItem from '../components/tweetitem';
import { openLightBox } from '../actions/lightbox';

function mapStateToProps(state, props) {
  return {
    tweet: (state.tweets.timeline[props.timelineKey] &&
            state.tweets.timeline[props.timelineKey].entities.tweets[props.id]) ||
      state.addColumnMenu.searchedTweets.entities.tweets[props.id],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    openLightBox: bindActionCreators(openLightBox, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TweetItem);

