import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import './index.css';

async function enableMocking() {
  if (process.env.REACT_APP_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser');

  return worker.start({ onUnhandledRequest: 'bypass' });
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

enableMocking().then(() => root.render(<App />));
