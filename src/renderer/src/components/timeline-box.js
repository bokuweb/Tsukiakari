import React, { Component } from 'react';
import Timeline from './timeline';

export default class TimelineBox extends Component {
  constructor(props) {
    super(props);
  }

  update() {
    console.log('update');
    this.refs.timeline.updateElementState(this.props.timeline);
  }

  onClick(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="timeline-box">
        <div className="timeline-box__wrapper--title">
          <span className="timeline-box__title">title</span>
          <i className="timeline-box__icon lnr lnr-cog" />
          <i className="timeline-box__icon lnr lnr-cross" />
        </div>
        <Timeline ref="timeline" id={this.props.id} timeline={this.props.timeline} />
      </div>
    );
  }
}
