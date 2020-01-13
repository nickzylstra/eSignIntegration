import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';

// TODO - get org id from Welkin call to start app
const org = { id: '1234325' };
ReactDOM.render(<App org={org} />, document.getElementById('app'));
