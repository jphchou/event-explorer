import React, { Component } from 'react';
import './App.css';
import { mockResponse } from './assets/event_data'

import TimelineContainer from './components/TimelineContainer';
import EventDisplay from './components/EventDisplay';
import Filters from './components/Filters';

import { CircleSpinner } from 'react-spinners-kit'
import { Drawer, Typography, Divider, CssBaseline } from '@material-ui/core';

import moment from 'moment';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      data: {},
      filteredData: {},
      curSelected: null,
      filters: {}
    }
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData() {
    this.setState({ loading: true })

    // Add a short delay to simulate a fetch
    setTimeout(() => {
      mockResponse.events.forEach((event, index) => event.id = index)
      this.setState({ data: mockResponse, filteredData: mockResponse, loading: false })
    }, 2000)
  }

  selectEvent(e) {
    if (e.item !== null) {
      this.setState({ curSelected: e.item })
    }
  }

  onFilterChange(val, filter) {
    this.setState(prevState => ({
      filters: {
        ...prevState.filters,
        [filter]: val
      }
    }), this.applyFilters)
  }

  // Creates and stores a copy of the data with all filters applied
  applyFilters() {
    let filtered = Object.assign({}, this.state.data)

    if (this.state.filters.prediction) {
      filtered.events = filtered.events.filter(event => {
        return event.predictions.some(prediction => {
          return prediction.scores.some(score => {
            let label = score.label.toLowerCase()
            let filter = this.state.filters.prediction.toLowerCase()
            let labelMatch = label.includes(filter)

            let scoreMatch = true
            let scoreFilter = this.state.filters.score
            if (scoreFilter) {
              scoreMatch = score.score >= scoreFilter[0] && score.score <= scoreFilter[1]
            }

            return labelMatch && scoreMatch
          })
        })
      })
    }

    if (this.state.filters.video) {
      filtered.events = filtered.events.filter(event => {
        return event.videoStream.toLowerCase().includes(this.state.filters.video.toLowerCase())
      })
    }

    if (this.state.filters.startDate) {
      filtered.events = filtered.events.filter(event => {
        return moment.unix(event.timestamp).isAfter(moment(this.state.filters.startDate))
      })
    }

    if (this.state.filters.endDate) {
      filtered.events = filtered.events.filter(event => {
        return moment.unix(event.timestamp).isBefore(moment(this.state.filters.endDate))
      })
    }

    this.setState({ filteredData: filtered })
  }

  resetFilters() {
    this.setState({ filters: {}, filteredData: this.state.data })
  }

  // For the given prediction, marks the given label as correct and all others as incorrect
  markCorrect(correctScoreIndex, prediction, id) {
    let newData = Object.assign({}, this.state.data)
    let scores = newData.events[id].predictions[prediction].scores
    scores.forEach((score, index) => {
      if (index === correctScoreIndex) {
        score.correct = !score.correct
      } else {
        score.correct = false
      }
    })
    this.setState({data: newData}, () => this.applyFilters())
  }

  render() {
    return (
      <div className="app">
        <CssBaseline />


        <div className="spinner">
          <CircleSpinner
            size={50}
            color="#16161f"
            loading={this.state.loading} />
        </div>

        {
          !this.state.loading &&
          <Drawer
            className="drawer"
            variant="permanent"
            anchor="left"
            classes={{ paper: "drawer-paper" }}
          >
            <Typography component="h1" variant="h5">Event Explorer</Typography>
            <Divider />

            <Filters
              handleChange={(val, source) => this.onFilterChange(val, source)}
              handleReset={() => this.resetFilters()}
            />
          </Drawer>
        }

        {
          !this.state.loading &&
          <main className="content">
            <TimelineContainer data={this.state.filteredData.events} onClick={e => this.selectEvent(e)} />
            <EventDisplay
              event={this.state.data.events[this.state.curSelected]}
              markCorrect={(score, prediction, id) => this.markCorrect(score, prediction, id)}
            />
          </main>
        }
      </div>
    )
  }
}