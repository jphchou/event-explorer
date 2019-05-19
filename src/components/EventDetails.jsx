import React, { Component } from 'react';
import PredictionTable from './PredictionTable'

import Typography from '@material-ui/core/Typography'
import Moment from 'react-moment';

import './EventDetails.css'

export default class EventDetails extends Component {
  render() {
    return (
      <div>
        <div className="detail-section">
          <Typography component="h2" variant="h6">Video Stream</Typography>
          {this.props.event.videoStream}
        </div>

        <div className="detail-section">
          <Typography component="h2" variant="h6">Timestamp</Typography>
          <Moment format="LLL" parse="X">{this.props.event.timestamp}</Moment>
        </div>

        <div className="detail-section">
          <Typography component="h2" variant="h6">Predictions</Typography>
          {
            this.props.prediction !== undefined ?
            <PredictionTable
              predictions={this.props.event.predictions[this.props.prediction].scores}
              markCorrect={this.props.markCorrect}
            /> :
            "No bounding box selected."
          }
        </div>
      </div>
    );
  }
}
