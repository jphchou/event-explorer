import React from 'react';
import { render, cleanup, fireEvent } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect'
import Filters from './Filters';

afterEach(cleanup)

it('renders without crashing', async () => {
    const { getByText } = render(<Filters />);
    expect(getByText('Filters')).toBeInTheDocument()
});

it('changes filter values in response to input', async () => {
    const { getByLabelText } = render(<Filters handleChange={() => { }} />);

    fireEvent.change(getByLabelText('Prediction'), { target: { value: 'cat' } })
    fireEvent.change(getByLabelText('Video Stream'), { target: { value: 'vet' } })
    expect(getByLabelText('Prediction').value).toEqual('cat')
    expect(getByLabelText('Video Stream').value).toEqual('vet')
});

it('resets filter values when pressing the reset button', async () => {
    const { getByLabelText } = render(<Filters handleChange={() => { }} handleReset={() => { }} />);

    fireEvent.change(getByLabelText('Prediction'), { target: { value: 'cat' } })
    fireEvent.change(getByLabelText('Video Stream'), { target: { value: 'vet' } })
    fireEvent.click(document.querySelector('button'))
    expect(getByLabelText('Prediction').value).toEqual('')
    expect(getByLabelText('Video Stream').value).toEqual('')
});