import React, { Component } from 'react';
import Timeline from './timeline';

export default class Contents extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchHomeTimeline(this.props.accounts[0]);
  }


  render() {
    return (
      <div className="contents">
        <Timeline timeline={this.props.timeline} />
      </div>
    );
  }
}
