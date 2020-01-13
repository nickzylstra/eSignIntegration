import React from 'react';

const FormSelect = (props) => {
  const { forms } = props;

  return (
    <>
      {forms.map(({ name, templateId }) => (
        <div key={templateId}>
          {name}
        </div>
      ))}
    </>
  );
};

export default FormSelect;
