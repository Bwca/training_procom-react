import React from 'react';

import { RouterProvider } from 'react-router-dom';
import { Box, Container } from '@mui/material';

import './App.css';
import { ROUTER } from './routing';
import { Navigation } from './navigation';

export function App() {
  return (
    <>
      <Navigation />
      <Container maxWidth="lg">
        <Box mt={14} mb={6}>
          <RouterProvider router={ROUTER} />
        </Box>
      </Container>
    </>
  );
}
