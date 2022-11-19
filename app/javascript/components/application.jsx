import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('video-list'));
console.log(root);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
