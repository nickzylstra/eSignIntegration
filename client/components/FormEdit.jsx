import React, { useState } from 'react';
import '../App.css';


const FormEdit = (props) => {
  const { handleFormEdit } = props;

  const [patientName, setPatientName] = useState('');
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      handleFormEdit([
        ['patient_name', patientName],
      ]);
    }}
    >
      Patient Name:
      <input
        aria-label="patientInput"
        type="text"
        value={patientName}
        onChange={(e) => setPatientName(e.target.value)}
        placeholder="first last"
      />
      <br />
      <input className="Button-Primary" aria-label="editSubmit" type="submit" value="Review form" />
    </form>
  );
};

export default FormEdit;
