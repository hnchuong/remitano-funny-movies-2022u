import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import VideoList from './VideoList';

const root = ReactDOM.createRoot(document.getElementById('video-list'));
root.render(
  <React.StrictMode>
    <VideoList />
  </React.StrictMode>
);
