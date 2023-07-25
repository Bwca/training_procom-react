import { useCallback } from 'react';

import { EMPLOYEE_API, EmployeeDto } from '../../../api';
import { useGetRequestErrorHandleDecorator } from '../use-get-request-handle-decorator';
import { extractErrorMessage } from './utils';
import { useEmployee } from '../use-employee';
import { useEmployeeList } from '../use-employee-list';

export const useEmployeeApi = (successCallback?: () => void) => {
  const { setEmployee, employee } = useEmployee();
  const { setEmployeeList, employeeList } = useEmployeeList();

  const { requestHandleDecorator, isInProgress } = useGetRequestErrorHandleDecorator();

  const getEmployeeList = useCallback(
    requestHandleDecorator({
      func: async () => {
        const response = await EMPLOYEE_API.employeeList();
        setEmployeeList(response.data);
      },
    }),
    [requestHandleDecorator, successCallback],
  );

  const createEmployee = useCallback(
    requestHandleDecorator({
      func: async (employee: EmployeeDto) => {
        await EMPLOYEE_API.employeeCreate(employee);
        successCallback?.();
      },
      successMessage: 'Employee created!',
      generateProblemMessage: extractErrorMessage,
    }),
    [requestHandleDecorator, successCallback, extractErrorMessage],
  );

  const getEmployeeById = useCallback(
    requestHandleDecorator({
      func: async (id: number) => {
        const response = await EMPLOYEE_API.employeeDetail(id);
        setEmployee(response.data);
      },
      generateProblemMessage: extractErrorMessage,
    }),
    [requestHandleDecorator, extractErrorMessage],
  );

  const deleteEmployee = useCallback(
    requestHandleDecorator({
      func: (id: number) => EMPLOYEE_API.employeeDelete(id),
      successMessage: `Employee has been deleted!`,
      generateProblemMessage: extractErrorMessage,
    }),
    [requestHandleDecorator, extractErrorMessage],
  );

  const updateEmployee = useCallback(
    requestHandleDecorator({
      func: async (id: number, employee: EmployeeDto) => {
        const response = await EMPLOYEE_API.employeeUpdate(id, employee);
        setEmployee(response.data);
        successCallback?.();
      },
      successMessage: 'Employee has been updated!',
      generateProblemMessage: extractErrorMessage,
    }),
    [requestHandleDecorator, successCallback, extractErrorMessage],
  );

  return {
    createEmployee,
    deleteEmployee,
    employee,
    employeeList,
    getEmployeeById,
    getEmployeeList,
    isInProgress,
    updateEmployee,
  };
};
