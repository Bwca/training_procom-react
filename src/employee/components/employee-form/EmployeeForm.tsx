import { FC, useCallback, useEffect, useMemo } from 'react';

import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';

import { EmployeeFormComponent } from './components';
import { useEmployeeApi } from '../../hooks';
import { EmployeeDto } from '../../../api';
import { ROUTES } from '../../../routing';
import { DeleteEmployeeButton } from '../delete-employee-button';

export const EmployeeForm: FC = () => {
  const navigate = useNavigate();
  const goToEmployeesList = useCallback(() => {
    navigate(generatePath(ROUTES.EMPLOYEE_LIST));
  }, [navigate]);

  const { createEmployee, isInProgress, employee, getEmployeeById, updateEmployee } = useEmployeeApi(goToEmployeesList);
  const params = useParams();

  const mode = useMemo(() => {
    return !!params.id ? 'edit' : 'create';
  }, [params.id]);

  useEffect(
    function fetchEmployee() {
      if (params.id) {
        getEmployeeById(+params.id);
      }
    },
    [params.id, getEmployeeById],
  );

  const onFormSubmit = useCallback(
    (data: Partial<EmployeeDto>) => {
      params.id ? updateEmployee(+params.id, data) : createEmployee(data);
    },
    [createEmployee, updateEmployee, params.id],
  );

  const canShowEmployeeForm = useMemo(() => (params.id && employee) || !params.id, [employee, params.id]);

  return (
    <>
      {isInProgress && <CircularProgress />}
      {canShowEmployeeForm && (
        <>
          <Box visibility={isInProgress ? 'hidden' : 'visible'} display="flex" justifyContent="space-between" alignItems="center">
            <Typography
              variant="h3"
              component="h3"
              sx={{
                margin: '40px 0',
              }}
            >
              {mode === 'edit' ? 'Edit Employee' : 'Create Employee'}
            </Typography>
            {employee?.id && <DeleteEmployeeButton id={employee.id} onDelete={goToEmployeesList} />}
          </Box>

          <div
            style={{
              pointerEvents: isInProgress ? 'none' : 'inherit',
              opacity: isInProgress ? 0.5 : 1,
            }}
          >
            <EmployeeFormComponent onSubmit={onFormSubmit} employee={employee} />
          </div>
        </>
      )}
    </>
  );
};
