import { FC, useMemo } from 'react';

import { AppBar, Button, IconButton, Link, Toolbar, Typography } from '@mui/material';
import { generatePath, useNavigate } from 'react-router-dom';

import { ROUTES } from '../routing';
import logo from '../assets/logo.gif';

export const Navigation: FC = () => {
  const navigate = useNavigate();

  const { goHome, goToEmployeeCreate, goToToEmployeesList } = useMemo(
    () => ({
      goHome: () => navigate(generatePath(ROUTES.ROOT)),
      goToToEmployeesList: () => navigate(generatePath(ROUTES.EMPLOYEE_LIST)),
      goToEmployeeCreate: () => navigate(generatePath(ROUTES.EMPLOYEE_CREATE)),
    }),
    [navigate],
  );

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton onClick={goHome} size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <Link>
            <img src={logo} alt="Example" style={{ width: '50px', marginTop: 10 }} />
          </Link>
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          E-manager
        </Typography>
        <Button color="inherit" onClick={goToToEmployeesList}>
          List
        </Button>
        <Button color="inherit" onClick={goToEmployeeCreate}>
          Create
        </Button>
      </Toolbar>
    </AppBar>
  );
};
