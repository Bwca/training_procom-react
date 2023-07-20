import { FC, useCallback } from 'react';

import { generatePath, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

import { ROUTES } from '../../../routing';

export const EditEmployeeButton: FC<{ id: number }> = ({ id }) => {
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(generatePath(ROUTES.EMPLOYEE_VIEW, { id: id.toString() }));
  }, [navigate, id]);

  return (
    <Button onClick={handleClick} type="button" color="secondary">
      edit
    </Button>
  );
};
