import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core'
import EventImage from './EventImage'
import EventDetails from './EventDetails'
import './EventDisplay.css'

export default class EventDisplay extends Component {
  constructor(props) {
    super(props)
    this.state = {
      event: this.props.event
    }
  }

  componentWillUpdate(nextProps) {
    if (nextProps.event !== this.props.event) {
      let event = nextProps.event
      let selectedPrediction = nextProps.event.predictions.length === 1 ? 0 : undefined
      this.setState({ event, selectedPrediction })
    }
  }

  selectPrediction(e) {
    let newSelection = this.state.selectedPrediction === e ? undefined : e
    this.setState({ selectedPrediction: newSelection })
  }

  render() {
    return (
      <div className="event-display">
        {
          this.state.event &&
          <Grid container spacing={16}>
            <Grid item md={3} sm={12}>
              <EventDetails
                event={this.state.event}
                prediction={this.state.selectedPrediction}
                markCorrect={(e) => this.props.markCorrect(e, this.state.selectedPrediction, this.state.event.id)}
              />
            </Grid>
            <Grid item md={9} sm={12}>
              <EventImage
                event={this.state.event}
                prediction={this.state.selectedPrediction}
                clickHandler={e => this.selectPrediction(e)}
              />
            </Grid>
          </Grid>
        }

        {!this.state.event && <Typography variant="h5">Select an event to view details.</Typography>}
      </div>
    );
  }
}
