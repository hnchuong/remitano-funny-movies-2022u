import React from 'react';
import ReactDOM from 'react-dom/client';
import VideoList from './VideoList';

const rootElement = document.getElementById('video-list');
if (rootElement) {
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <VideoList />
  </React.StrictMode>
);
}
