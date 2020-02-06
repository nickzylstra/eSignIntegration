import React from 'react';
import axiosMock from 'axios';
import { fireEvent, waitForElement } from '@testing-library/react';
import customRender from '../test-utils/customRender.jsx';
import App from './App.jsx';

jest.mock('axios');

const host = 'http://localhost:3000';

describe('App', () => {
  const form1Name = 'form1';
  const signer1Name = 'signer1';
  test('loads app component and fetches data', async () => {
    axiosMock
      .mockResolvedValueOnce({
        data: {
          envelopeTemplates: [{
            name: form1Name,
            templateId: 'id1',
          }],
        },
      })
      .mockResolvedValueOnce({
        data: {
          contacts: [{
            name: signer1Name,
            contactId: 'id1',
            organization: 'org1',
            emails: ['email1'],
          }],
        },
      });

    const { getByLabelText, getByText } = customRender(<App org="test" host={host} />);
    const label = getByLabelText(/app/i);
    expect(label).toBeInTheDocument();
    const templateName = await waitForElement(() => getByText(form1Name));
    expect(templateName).toBeInTheDocument();
    const signerName = await waitForElement(() => getByText(new RegExp(`${signer1Name}`)));
    expect(signerName).toBeInTheDocument();
  });
});
