import React from 'react';

import { RouterProvider } from 'react-router-dom';

import './App.css';
import { ROUTER } from './routing/Router';

export function App() {
  return (
    <div className="App">
      <RouterProvider router={ROUTER} />
    </div>
  );
}
