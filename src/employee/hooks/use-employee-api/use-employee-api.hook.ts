import { useCallback, useState } from 'react';

import { EMPLOYEE_API, EmployeeDto } from '../../../api';
import { useGetRequestErrorHandleDecorator } from '../use-get-request-handle-decorator';

export const useEmployeeApi = () => {
  const [employeeList, setEmployeeList] = useState<Array<EmployeeDto>>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { requestHandleDecorator, isInProgress } = useGetRequestErrorHandleDecorator(setErrorMessage);

  const getEmployeeList = useCallback(
    requestHandleDecorator(async () => {
      const response = await EMPLOYEE_API.employeeList();
      setEmployeeList(response.data);
    }),
    [requestHandleDecorator],
  );

  const createEmployee = useCallback(
    requestHandleDecorator(async (employee: EmployeeDto) => {
      await EMPLOYEE_API.employeeCreate(employee);
    }),
    [requestHandleDecorator],
  );

  return {
    employeeList,
    getEmployeeList,
    createEmployee,
    errorMessage,
    isInProgress,
  };
};
