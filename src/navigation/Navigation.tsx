import { FC } from 'react';

import { AppBar, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';

import { ROUTES } from '../routing';
import logo from '../assets/logo.gif';

export const Navigation: FC = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <Link href={ROUTES.ROOT}>
            <img src={logo} alt="Example" style={{ width: '50px', marginTop: 10 }} />
          </Link>
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          E-manager
        </Typography>
        <Button color="inherit" component={Link} href={ROUTES.EMPLOYEE_LIST}>
          List
        </Button>
        <Button color="inherit" component={Link} href={ROUTES.EMPLOYEE_CREATE}>
          Create
        </Button>
      </Toolbar>
    </AppBar>
  );
};
