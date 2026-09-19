import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

// DIAGNOSTIC LOG
console.log(`[SYSTEM DIAGNOSTIC] React Version: ${React.version}`);
console.log(`[SYSTEM DIAGNOSTIC] Environment: ${process.env.NODE_ENV || 'Browser'}`);

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error("FATAL ERROR: Sovereing Mesh Root not found. System termination imminent.");
}