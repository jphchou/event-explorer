import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect'
import EventDisplay from './EventDisplay';
import { mockResponse } from '../assets/event_data'

const testEvent = mockResponse.events[0]

afterEach(cleanup)

it('renders placeholder text if no event is given', async () => {
    const { getByText } = render(<EventDisplay />);
    expect(getByText('Select an event', { exact: false })).toBeInTheDocument()
});

it('renders event image and details', async () => {
    const { getByText, getByAltText } = render(<EventDisplay event={testEvent} />);
    expect(getByText('Warriors Game')).toBeInTheDocument()
    expect(getByAltText('Warriors Game')).toBeInTheDocument()
    expect(document.querySelector('time')).toBeInTheDocument()
});

it('renders event image and details', async () => {
    const { getByText, getByAltText, getAllByTitle } = render(<EventDisplay event={testEvent} />);
    expect(getByText('Warriors Game')).toBeInTheDocument()
    expect(getAllByTitle('Bounding box', { exact: false })).toHaveLength(2)
    expect(getByAltText('Warriors Game')).toBeInTheDocument()
    expect(document.querySelector('time')).toBeInTheDocument()
});

it('shows predictions after selecting a bounding box', async () => {
    const { getByText } = render(<EventDisplay event={testEvent} />);
    fireEvent.click(document.querySelector('.box-handle'))
    expect(getByText('Steph Curry')).toBeInTheDocument()
});

it('deselects a bounding box if it is already selected', async () => {
    const { queryByText } = render(<EventDisplay event={testEvent} />);
    fireEvent.click(document.querySelector('.box-handle'))
    fireEvent.click(document.querySelector('.box-handle'))
    expect(queryByText('Steph Curry')).toBeNull()
});