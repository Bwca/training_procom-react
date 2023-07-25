import React from 'react';

import { RouterProvider } from 'react-router-dom';
import { Box, Container } from '@mui/material';

import './App.css';
import { ROUTER } from './routing';
import { Navigation } from './navigation';
import { Notification } from './notification';

export function App() {
  return (
    <>
      <Navigation />
      <Notification />
      <Container maxWidth="lg">
        <Box mt={20} mb={6}>
          <RouterProvider router={ROUTER} />
        </Box>
      </Container>
    </>
  );
}
