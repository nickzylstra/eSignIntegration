import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const FormSelect = (props) => {
  const {
    forms, signers, handleFormSelect,
  } = props;

  const defaultFormId = '--- please select form ---';
  const [formId, setFormId] = useState(defaultFormId);
  const defaultSignerId = '--- please select signer ---';
  const [signerId, setSignerId] = useState(defaultSignerId);

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleFormSelect(formId, signerId);
    }}
    >
      <select
        name="form"
        value={formId}
        onChange={(e) => setFormId(e.target.value)}
      >
        <option value={defaultFormId} disabled>{defaultFormId}</option>
        {forms.map(({ name, templateId }) => (
          <option key={templateId} value={templateId}>{name}</option>
        ))}
      </select>

      <br />

      <select
        name="signer"
        value={signerId}
        onChange={(e) => setSignerId(e.target.value)}
      >
        <option value={defaultSignerId} disabled>{defaultSignerId}</option>
        {signers.map(({
          name, contactId, emails, organization,
        }) => (
          <option key={contactId} value={contactId}>
            {name}
            {' of '}
            {organization}
            {' email: '}
            {emails[0]}
          </option>
        ))}
      </select>

      <br />
      <br />
      <input type="submit" value="Edit form before submitting for signature" />
    </form>
  );
};

export default FormSelect;
