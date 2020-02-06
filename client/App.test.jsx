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
  const formsData = {
    data: {
      envelopeTemplates: [{
        name: form1Name,
        templateId: 'id1',
      }],
    },
  };
  const signersData = {
    data: {
      contacts: [{
        name: signer1Name,
        contactId: 'id1',
        organization: 'org1',
        emails: ['email1'],
      }],
    },
  };

  test('loads app component and fetches data', async () => {
    axiosMock
      .mockResolvedValueOnce(formsData)
      .mockResolvedValueOnce(signersData);

    const { getByLabelText, getByText } = customRender(<App org="test" host={host} />);
    const label = getByLabelText(/app/i);
    const templateName = await waitForElement(() => getByText(form1Name));
    const signerName = await waitForElement(() => getByText(new RegExp(`${signer1Name}`)));

    expect(label).toBeInTheDocument();
    expect(templateName).toBeInTheDocument();
    expect(signerName).toBeInTheDocument();
  });

  test('progresses through selection and edit flow', async () => {
    axiosMock
      .mockResolvedValueOnce(formsData)
      .mockResolvedValueOnce(signersData);

    const { getByLabelText } = customRender(<App org="test" host={host} />);
    const formSelectElem = await waitForElement(() => getByLabelText('formSelect'));
    const signerSelectElem = await waitForElement(() => getByLabelText('signerSelect'));
    const selectSubmitElem = await waitForElement(() => getByLabelText('selectSubmit'));

    fireEvent.change(formSelectElem, { target: { value: form1Name } });
    fireEvent.change(signerSelectElem, { target: { value: signer1Name } });
    fireEvent.click(selectSubmitElem);

    const patientInputElem = await waitForElement(() => getByLabelText('patientInput'));
    expect(patientInputElem).toBeInTheDocument();

    const editSubmitElem = await waitForElement(() => getByLabelText('editSubmit'));
    fireEvent.click(editSubmitElem);

    // const reviewSubmitElem = await waitForElement(() => getByLabelText('reviewSubmit'));
    // fireEvent.click(reviewSubmitElem);

    // const startAgainElem = await waitForElement(() => getByLabelText('startAgainButton'));
    // expect(startAgainElem).toBeInTheDocument();
  });
});
