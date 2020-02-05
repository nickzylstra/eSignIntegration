import React from 'react';
import axiosMock from 'axios';
import customRender from '../test-utils/customRender.jsx';
import App from './App.jsx';

jest.mock('axios');


describe('App', () => {
  test('renders app component', () => {
    const { getByLabelText } = customRender(<App org="test" />);
    const label = getByLabelText(/app/i);
    expect(label).toBeInTheDocument();
  });
});
