import React, { useState } from 'react';

const FormSelect = (props) => {
  const { forms, signers } = props;

  const defaultFormVal = '--- please select form ---';
  const defaultSignerVal = '--- please select signer ---';
  const [formVal, setFormVal] = useState(defaultFormVal);
  const [signersVal, setSignersVal] = useState(defaultSignerVal);

  return (
    <form>
      <select
        name="form"
        value={formVal}
        onChange={({ target }) => setFormVal(target.value)}
      >
        <option value={defaultFormVal} disabled>{defaultFormVal}</option>
        {forms.map(({ name, templateId }) => (
          <option key={templateId} value={templateId}>{name}</option>
        ))}
      </select>

      <br />

      <select
        name="signer"
        value={signersVal}
        onChange={({ target }) => setSignersVal(target.value)}
      >
        <option value={defaultSignerVal} disabled>{defaultSignerVal}</option>
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
    </form>
  );
};

export default FormSelect;
