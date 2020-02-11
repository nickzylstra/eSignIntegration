import React, { useState } from 'react';
import styles from '../App.css';

const FormSelect = (props) => {
  const {
    forms, signers, handleFormSelect,
  } = props;

  const defaultFormId = '--- please select form ---';
  const [formId, setFormId] = useState(defaultFormId);
  const defaultSignerId = '--- please select signer ---';
  const [signerId, setSignerId] = useState(defaultSignerId);

  const handleChange = (e) => {
    setFormId(e.target.value);
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleFormSelect(formId, signerId);
    }}
    >
      <select
        name="form"
        aria-label="formSelect"
        value={formId}
        onChange={handleChange}
      >
        <option value={defaultFormId} disabled>{defaultFormId}</option>
        {forms.map(({ name, templateId }) => (
          <option key={templateId} value={templateId}>{name}</option>
        ))}
      </select>

      <br />

      <select
        name="signer"
        aria-label="signerSelect"
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
      <input className={styles.buttonPrimary} aria-label="selectSubmit" type="submit" value="Edit form" />
    </form>
  );
};

export default FormSelect;
