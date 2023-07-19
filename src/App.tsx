import React from 'react';

import { RouterProvider } from 'react-router-dom';
import { Container } from '@mui/material';

import './App.css';
import { ROUTER } from './routing';

export function App() {
  return (
    <Container maxWidth="lg">
      <RouterProvider router={ROUTER} />
    </Container>
  );
}
