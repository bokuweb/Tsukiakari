import React, { Component } from 'react';
import SortablePane, {Pane} from 'react-sortable-pane';
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
      <SortablePane customClass="contents" margin={10}>
        <Pane width={320} minWidth={320} style={{overflowX: 'hidden'}}><TimelineBox timeline={this.props.timeline} /></Pane>
        <Pane width={320} minWidth={320} style={{overflowX: 'hidden'}}><TimelineBox timeline={this.props.timeline} /></Pane>
        <Pane width={320} minWidth={320} style={{overflowX: 'hidden'}}><TimelineBox timeline={this.props.timeline} /></Pane>
        <Pane width={320} minWidth={320} style={{overflowX: 'hidden'}}><TimelineBox timeline={this.props.timeline} /></Pane>
      </SortablePane>
    );
  }
}
