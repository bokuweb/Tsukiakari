import React, { Component, PropTypes } from 'react';
import Timeline from './timeline';

export default class TimelineBox extends Component {
  static propTypes = {
    timeline: PropTypes.array,
    column: PropTypes.object,
    deleteRequest: PropTypes.func,
  };

  static defaultProps = {

  };

  constructor(props) {
    super(props);
    this.onClose = ::this.onClose;
  }

  onMouseDown(e) {
    e.stopPropagation();
  }

  onClose() {
    const { column } = this.props;
    this.props.deleteRequest(column.id, column.timerId);
  }

  update() {
    this.refs.timeline.updateElementState(this.props.timeline);
  }

  render() {
    const { id, title, icon, contents, timeline } = this.props.column;
    return (
      <div className="timeline-box">
        <div className="timeline-box__wrapper--title">
          <span className="timeline-box__title">
            <i className={`timeline-box__icon--title ${icon}`} />
            {title}
            <span className="timeline-box__username">
              @{contents[0].account.screen_name}
            </span>
          </span>
          <i className="timeline-box__icon lnr lnr-cog" />
          <i
            className="timeline-box__icon lnr lnr-cross"
            onMouseDown={this.onMouseDown}
            onClick={this.onClose}
          />
        </div>
        <Timeline ref="timeline" id={id} timeline={timeline} />
      </div>
    );
  }
}
