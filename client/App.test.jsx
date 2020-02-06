import React from 'react';
import axiosMock from 'axios';
import customRender from '../test-utils/customRender.jsx';
import App from './App.jsx';

jest.mock('axios');

const host = 'http://localhost:3000';

describe('App', () => {
  test('loads app component and fetches data', () => {
    axiosMock
      .mockResolvedValueOnce({
        data: {
          envelopeTemplates: [{
            name: 'form1',
            templateId: 'id1',
          }],
        },
      })
      .mockResolvedValueOnce({
        data: {
          contacts: [{
            name: 'signer1',
            contactId: 'id1',
            organization: 'org1',
            emails: ['email1'],
          }],
        },
      });

    const { getByLabelText } = customRender(<App org="test" host={host} />);
    const label = getByLabelText(/app/i);
    expect(label).toBeInTheDocument();
  });
});
