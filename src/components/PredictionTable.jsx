import React, { Component } from 'react';
import { Grid, IconButton } from '@material-ui/core'
import CheckCircle from '@material-ui/icons/CheckCircle';

import './PredictionTable.css';

export default class PredictionTable extends Component {

    renderPredictions() {
        return this.props.predictions.map((prediction, index) => {
            return (
                <Grid container item
                    xs={12}
                    spacing={8}
                    className={prediction.correct ? "correct-prediction-row" : ""}
                    key={index}
                >
                    <Grid item xs={6} className="prediction-label">
                        <div className="prediction-elem">{prediction.label}</div>
                    </Grid>
                    <Grid item xs={2} className="prediction-elem" >
                        <div className="prediction-elem">{prediction.score}</div>
                    </Grid>
                    <Grid item xs={4} className="prediction-elem">
                        <IconButton
                            aria-label="Mark correct"
                            title="Mark correct"
                            onClick={() => this.props.markCorrect(index)}
                        >
                            <CheckCircle color={prediction.correct ? "primary" : "disabled"} />
                        </IconButton>
                    </Grid>
                </Grid>
            )
        })
    }

    render() {
        return (
            <Grid container spacing={8}>
                {this.renderPredictions()}
            </Grid>
        );
    }
}
