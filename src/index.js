import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom
import App from './App';

// Get the root element in your HTML file (usually has an id of 'root')
const container = document.getElementById('root');
const root = createRoot(container); // Create a root using createRoot

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
