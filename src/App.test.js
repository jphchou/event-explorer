import React from 'react';
import { render, cleanup, waitForElement } from 'react-testing-library';
import 'react-testing-library/cleanup-after-each';
import 'jest-dom/extend-expect'
import App from './App';

afterEach(cleanup)

it('renders the title', async () => {
  const { getByText } = render(<App />);

  await waitForElement(() => getByText('Event Explorer'))
});