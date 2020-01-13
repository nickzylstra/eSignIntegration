import React from 'react';

const SignerSelect = (props) => {
  const { signers } = props;

  return (
    <>
      {signers.map(({
        name, contactId, emails, organization,
      }) => (
        <div key={contactId}>
          {name}
          {emails[0]}
          {organization}
        </div>
      ))}
    </>
  );
};

export default SignerSelect;
