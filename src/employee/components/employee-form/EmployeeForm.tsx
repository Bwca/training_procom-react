import { FC, useCallback, useEffect, useMemo } from 'react';

import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';

import { EmployeeFormComponent } from './components';
import { useEmployeeApi } from '../../hooks';
import { EmployeeDto } from '../../../api';
import { ROUTES } from '../../../routing';
import { DeleteEmployeeButton } from '../delete-employee-button';

export const EmployeeForm: FC = () => {
  const { createEmployee, isInProgress, employee, getEmployeeById, updateEmployee } = useEmployeeApi();
  const params = useParams();
  const navigate = useNavigate();

  const mode = useMemo(() => {
    return !!params.id ? 'edit' : 'create';
  }, [params.id]);

  useEffect(
    function fetchEmployee() {
      if (params.id) {
        getEmployeeById(+params.id);
      }
    },
    [params.id],
  );

  const goToEmployeesList = useCallback(() => {
    navigate(generatePath(ROUTES.EMPLOYEE_LIST));
  }, [navigate]);

  const onFormSubmit = useCallback(
    async (data: Partial<EmployeeDto>) => {
      await (params.id ? updateEmployee(+params.id, data) : createEmployee(data));
      goToEmployeesList();
    },
    [goToEmployeesList, createEmployee, updateEmployee, params.id],
  );

  const canShowEmployeeForm = useMemo(() => (params.id && employee) || !params.id, [employee, params.id]);

  return (
    <>
      {isInProgress ? (
        <CircularProgress />
      ) : (
        canShowEmployeeForm && (
          <>
            <Box display="flex" justifyContent="space-between" alignItems="center">
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

            <EmployeeFormComponent onSubmit={onFormSubmit} employee={employee} />
          </>
        )
      )}
    </>
  );
};
