import React, { Component } from 'react';
import BoundingBox from './BoundingBox'

export default class EventImage extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderBoxes() {
    let predictions = this.props.event.predictions
    return predictions.map((prediction, index) => {
      let correctElem = prediction.scores.find(score => score.correct)
      let correctLabel = correctElem ? correctElem.label : ''
      return <BoundingBox
        key={index}
        box={prediction.boundingBox}
        clickHandler={_ => this.props.clickHandler(index)}
        selected={this.props.prediction === index}
        label={correctLabel}
      />
    })
  }

  render() {
    return (
      <div className="image-container">
        <img className="event-image"
          src={this.props.event.imageSource}
          alt={this.props.event.videoStream}
        />

        {this.renderBoxes()}
      </div>
    );
  }
}
