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

ReactDOM.render((
  <BrowserRouter>
    <App host={host} />
  </BrowserRouter>
), document.getElementById('app'));
