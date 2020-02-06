import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
} from 'react-router-dom';
import App from './App.jsx';

const localhost = 'http://localhost:3000';
const aws = 'https://esigndemo.nickzylstra.com/';
const { origin } = window.location;
const host = (origin && !origin.includes('localhost')) ? aws : localhost;
if (host === localhost) {
  console.log(`using ${localhost} for API server since client loaded at 'localhost'`);
}

// TODO - get org id from Welkin request to start app
const org = { orgId: 'TODO' };
ReactDOM.render((
  <BrowserRouter>
    <App org={org} host={host} />
  </BrowserRouter>
), document.getElementById('app'));
