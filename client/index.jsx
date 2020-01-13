import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

// TODO - get org id from Welkin request to start app
// using docusign folder Id for now
const org = { orgId: '0df7af7f-945d-4b38-a58d-6225f94c8b07' };
ReactDOM.render(<App org={org} />, document.getElementById('app'));
