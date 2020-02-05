import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { render } from '@testing-library/react';

export default function customRender(ui) {
  return {
    ...render(<BrowserRouter>{ui}</BrowserRouter>),
  };
}
