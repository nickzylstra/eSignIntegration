import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
} from 'react-router-dom';
import App from './App.jsx';

// TODO - get org id from Welkin request to start app
const org = { orgId: 'TODO' };
ReactDOM.render((
  <BrowserRouter>
    <App org={org} />
  </BrowserRouter>
), document.getElementById('app'));
