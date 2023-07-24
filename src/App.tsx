import React from 'react';

import { RouterProvider } from 'react-router-dom';
import { Box, Container } from '@mui/material';

import './App.css';
import { ROUTER } from './routing';
import { Navigation } from './navigation';
import { NotificationProvider } from './notification';
import { Notification } from './notification/components';

export function App() {
  return (
    <NotificationProvider>
      <Navigation />
      <Notification />
      <Container maxWidth="lg">
        <Box mt={14} mb={6}>
          <RouterProvider router={ROUTER} />
        </Box>
      </Container>
    </NotificationProvider>
  );
}
