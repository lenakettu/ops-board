import './styles/globals.css';

import React from 'react';
import ReactDOM from 'react-dom/client';

import { ToastProvider } from '@/shared/ui/toast';

import { App } from './App';
import { QueryProvider } from './providers/QueryProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </QueryProvider>
  </React.StrictMode>,
);
