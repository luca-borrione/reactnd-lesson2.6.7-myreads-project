import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { getBasename } from './utils/helpers';

ReactDOM.render(
  <Router basename={getBasename()}>
    <App />
  </Router>,
  document.getElementById('root'),
);

registerServiceWorker();
