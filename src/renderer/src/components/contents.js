import React, { Component, PropTypes } from 'react';
import { SortablePane, Pane } from 'react-sortable-pane';
import TimelineBox from './timeline-box';

export default class Contents extends Component {
  static propTypes = {
    timeline: PropTypes.array,
    fetchHomeTimeline: PropTypes.func,
    accounts: PropTypes.array,
  };

  constructor(props) {
    super(props);
    this.onPaneResize = ::this.onPaneResize;
  }

  componentWillMount() {
    this.props.fetchHomeTimeline(this.props.accounts[0]);
  }

  onPaneResize(pane) {
    console.dir(pane)
    this.refs[`${pane.id}Timeline`].update();
  }

  render() {
    return (
      <div className="contents">
      <SortablePane
        margin={20}
        onResize={this.onPaneResize}
        onResizeStop={this.onPaneResize}
        className="contents__sortable-pane"
      >
        <Pane
          id="pane1"
          width={320}
          minWidth={320}
          className="contents__pane"
        >
          <TimelineBox ref="pane1Timeline" timeline={this.props.timeline} />
        </Pane>
        <Pane id="pane2" ref="pane2" width={320} minWidth={320} className="contents__pane">
          <TimelineBox ref="pane2Timeline" timeline={this.props.timeline} />
        </Pane>
        <Pane id="pane3" ref="pane3" width={320} minWidth={320} className="contents__pane">
          <TimelineBox ref="pane3Timeline" timeline={this.props.timeline} />
        </Pane>
      </SortablePane>
      </div>
    );
  }
}
