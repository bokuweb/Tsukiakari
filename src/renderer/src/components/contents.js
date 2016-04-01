import React, { Component, PropTypes } from 'react';
import { SortablePane, Pane } from 'react-sortable-pane';
import TimelineBox from './timeline-box';

export default class Contents extends Component {
  static propTypes = {
    timeline: PropTypes.array,
    fetchHomeTimeline: PropTypes.func,
    accounts: PropTypes.array,
    columns: PropTypes.array,
  };

  static defaultProps = {
    columns: [],
  };

  constructor(props) {
    super(props);
    this.onPaneResize = ::this.onPaneResize;
  }

  onPaneResize(pane) {
    this.refs[`${pane.id}Timeline`].update();
  }

  renderPanes() {
    return this.props.columns.map(column => (
      <Pane
        id={column.id}
        key={column.id}
        width={320}
        minWidth={320}
        className="contents__pane"
      >
        <TimelineBox id={column.id} ref="pane1Timeline" timeline={this.props.timeline} />
      </Pane>
    ));
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
          {this.renderPanes()}
        </SortablePane>
      </div>
    );
  }
}
