import React, { useState } from 'react';

const FormSelect = (props) => {
  const { forms, signers } = props;


  return (
    <form>
      <select
        name="forms"
        value="Choose form"
      >
        {forms.map(({ name, templateId }) => (
          <option key={templateId} id={templateId}>
            {name}
          </option>
        ))}
      </select>
      <br />
      <select
        name="signers"
      >
        {signers.map(({
          name, contactId, emails, organization,
        }) => (
          <option key={contactId} id={contactId}>
            {name}
            {emails[0]}
            {organization}
          </option>
        ))}
      </select>
    </form>
  );
};

export default FormSelect;
