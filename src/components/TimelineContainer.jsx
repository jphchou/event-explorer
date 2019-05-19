import React, { Component } from 'react';
import Timeline from 'react-visjs-timeline'
import moment from 'moment'

const timelineOptions = {
  width: '100%',
  height: '200px',
  stack: true,
  showMajorLabels: true,
  showCurrentTime: false,
  zoomMax: 1000 * 60 * 60 * 24 * 31, // One month
  zoomMin: 1000 * 60                 // One minute
}

export default class TimelineContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      events: this.parseEvents(this.props.data)
    }
  }

  parseEvents(events) {
    return events.map(e => {
      return {
        start: moment.unix(e.timestamp),
        content: e.videoStream,
        id: e.id
      }
    })
  }

  componentWillUpdate(nextProps) {
    if (nextProps.data !== this.props.data) {
      let events = this.parseEvents(nextProps.data)
      this.setState({ events })
    }
  }

  render() {
    return (
      <Timeline
        options={timelineOptions}
        items={this.state.events}
        clickHandler={this.props.onClick}
      />
    );
  }
}
