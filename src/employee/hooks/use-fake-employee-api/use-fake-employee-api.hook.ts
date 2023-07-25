import { useCallback, useState } from 'react';

import { EmployeeDto } from '../../../api';
import { useGetRequestErrorHandleDecorator } from '../use-get-request-handle-decorator';
import { extractErrorMessage } from '../use-employee-api/utils';
import { useEmployeeApi } from '../use-employee-api';
import { STATE } from './constants';

export const useFakeEmployeeApi: typeof useEmployeeApi = (successCallback?: () => void) => {
  const [employeeList, setEmployeeList] = useState<Array<EmployeeDto>>([]);
  const [employee, setEmployee] = useState<EmployeeDto | null>(null);

  const { requestHandleDecorator, isInProgress } = useGetRequestErrorHandleDecorator();

  const getEmployeeList = useCallback(
    requestHandleDecorator({
      func: async () => {
        setEmployeeList([...STATE.EMPLOYEES]);
      },
    }),
    [requestHandleDecorator, successCallback],
  );

  const createEmployee = useCallback(
    requestHandleDecorator({
      func: async (employee: EmployeeDto) => {
        await STATE.addEmployee(employee);
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
        setEmployee(await STATE.fineEmployee(id));
      },
      generateProblemMessage: extractErrorMessage,
    }),
    [requestHandleDecorator, extractErrorMessage],
  );

  const deleteEmployee = useCallback(
    requestHandleDecorator({
      func: (id: number) => STATE.deleteEmployee(id),
      successMessage: `Employee has been deleted!`,
      generateProblemMessage: extractErrorMessage,
    }),
    [requestHandleDecorator, extractErrorMessage],
  );

  const updateEmployee = useCallback(
    requestHandleDecorator({
      func: async (id: number, employee: EmployeeDto) => {
        setEmployee(await STATE.updateEmployee(employee));
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
