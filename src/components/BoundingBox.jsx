import React, { Component } from 'react';
import Help from '@material-ui/icons/Help';
import CheckCircle from '@material-ui/icons/CheckCircle';
import './BoundingBox.css'

export default class BoundingBox extends Component {
    decimalToPercent(decimal) {
        return decimal * 100 + "%"
    }

    render() {
        let selected = this.props.selected ? 'box-selected' : ''
        let correct = this.props.label !== '' ? 'box-correct' : ''
        let classes = `bounding-box ${selected} ${correct}`
        console.log(classes)
        return (
            <div
                className={classes}
                style={{
                    left: this.decimalToPercent(this.props.box.left),
                    top: this.decimalToPercent(this.props.box.top),
                    height: this.decimalToPercent(this.props.box.height),
                    width: this.decimalToPercent(this.props.box.width)
                }}
            >
                <div className="box-handle" onClick={this.props.clickHandler}>
                    {
                        this.props.label ?
                        <CheckCircle className="handle-icon" titleAccess="Bounding box, marked correct"/> :
                        <Help className="handle-icon" titleAccess="Bounding box, not yet marked" />
                    }
                </div>

            </div>
        );
    }
}
