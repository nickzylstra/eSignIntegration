import React from 'react';
import customRender from '../test-utils/customRender.jsx';
import App from './App.jsx';


describe('App', () => {
  test('renders app component', () => {
    const { getByLabelText } = customRender(<App org="test" />);
    const label = getByLabelText(/app/i);
    expect(label).toBeInTheDocument();
  });
});
