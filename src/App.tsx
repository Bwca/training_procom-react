import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { Box, Container } from '@mui/material';

import './App.css';
import { AppRoutes } from './routing';
import { Navigation } from './navigation';
import { Notification } from './notification';

export function App() {
  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Notification />
        <Container maxWidth="lg">
          <Box mt={20} mb={6}>
            <AppRoutes />
          </Box>
        </Container>
      </BrowserRouter>
    </>
  );
}
