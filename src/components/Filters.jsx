import React, { Component } from 'react';
import { TextField, FormLabel, Typography, Button } from '@material-ui/core';
import { Range } from 'rc-slider';
import DatePicker from 'react-datepicker';
import 'rc-slider/assets/index.css';
import 'react-datepicker/dist/react-datepicker.css';
import './Filters.css';

export default class Filters extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    handleChange(val, source) {
        if (source === 'prediction' || source === 'video') {
            val = val.target.value
        }
        this.setState({ [source]: val })
        this.props.handleChange(val, source)
    }

    resetFilters() {
        this.setState(prevState => {
            for (const key of Object.keys(prevState)) {
                prevState[key] = null
            }
            return prevState
        })
        this.props.handleReset()
    }

    render() {
        return (
            <div className="filters">
                <div className="filters-header">
                    <Typography component="h2" variant="h6">Filters</Typography>
                    <Button
                        className="reset-button"
                        color="secondary"
                        onClick={() => this.resetFilters()}
                    >
                        Clear filters
                    </Button>
                </div>

                <form>
                    <div className="filter-group">
                        <TextField
                            id="prediction"
                            label="Prediction"
                            onChange={e => this.handleChange(e, 'prediction')}
                            value={this.state.prediction || ''}
                        />
                    </div>

                    <div className="filter-group">
                        <FormLabel component="label">Score</FormLabel>
                        <Range
                            id="score"
                            allowCross={false}
                            defaultValue={[0, 100]}
                            marks={{ 0: 0, 25: 25, 50: 50, 75: 75, 100: 100 }}
                            onChange={e => this.handleChange(e, 'score')}
                            value={this.state.score || [0, 100]}
                        />
                    </div>

                    <div className="filter-group">
                        <TextField
                            className="text-field"
                            id="video"
                            label="Video Stream"
                            onChange={e => this.handleChange(e, 'video')}
                            value={this.state.video || ''}
                        />
                    </div>

                    <div className="filter-group date-picker">
                        <FormLabel component="label">Start Date</FormLabel>
                        <DatePicker
                            onChange={e => this.handleChange(e, 'startDate')}
                            selected={this.state.startDate}
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            showTimeSelect
                            selectsStart
                            timeFormat="HH:mm"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            withPortal
                            showMonthDropdown
                            showYearDropdown
                            isClearable
                        />

                        <FormLabel component="label">End Date</FormLabel>
                        <DatePicker
                            onChange={e => this.handleChange(e, 'endDate')}
                            selected={this.state.endDate}
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            showTimeSelect
                            selectsEnd
                            timeFormat="HH:mm"
                            dateFormat="MMMM d, yyyy h:mm aa"
                            withPortal
                            showMonthDropdown
                            showYearDropdown
                            isClearable
                        />
                    </div>
                </form>
            </div>
        );
    }
}
