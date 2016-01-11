import React, { Component } from 'react';
import TimelineBox from './timeline-box';

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
        <TimelineBox timeline={this.props.timeline} />
        <TimelineBox timeline={this.props.timeline} />
        <TimelineBox timeline={this.props.timeline} />
        <TimelineBox timeline={this.props.timeline} />
      </div>
    );
  }
}
