import { FC, useCallback, useMemo } from 'react';

import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { CircularProgress, Typography } from '@mui/material';

import { EmployeeFormComponent } from './components';
import { useEmployeeApi } from '../../hooks';
import { EmployeeDto } from '../../../api';
import { ROUTES } from '../../../routing';

export const EmployeeForm: FC = () => {
  const { createEmployee, isInProgress } = useEmployeeApi();
  const params = useParams();
  const navigate = useNavigate();

  const mode = useMemo(() => {
    return !!params.id ? 'edit' : 'create';
  }, [params.id]);

  const onFormSubmit = useCallback(
    async (data: Partial<EmployeeDto>) => {
      await createEmployee(data);
      navigate(generatePath(ROUTES.EMPLOYEE_LIST));
    },
    [navigate, createEmployee],
  );

  return (
    <>
      <Typography
        variant="h3"
        component="h3"
        sx={{
          margin: '40px 0',
        }}
      >
        {mode === 'edit' ? 'Edit Employee' : 'Create Employee'}
      </Typography>
      {isInProgress ? <CircularProgress /> : <EmployeeFormComponent onSubmit={onFormSubmit} />}
    </>
  );
};
