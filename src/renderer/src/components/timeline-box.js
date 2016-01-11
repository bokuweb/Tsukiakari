import React, { Component } from 'react';
import Timeline from './timeline';

export default class TimelineBox extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="timeline-box">
        <div className="timeline-box__wrapper--title">
          <span className="timeline-box__title">title</span>
          <i className="timeline-box__icon lnr lnr-cog" />
          <i className="timeline-box__icon icon-remove" />
        </div>
        <Timeline timeline={this.props.timeline} />
      </div>
    );
  }
}
