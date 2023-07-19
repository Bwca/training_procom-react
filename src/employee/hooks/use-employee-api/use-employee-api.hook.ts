import { useCallback, useMemo, useState } from 'react';

import { EMPLOYEE_API, EmployeeDto } from '../../../api';
import { getRequestErrorHandleDecorator } from '../utils';

export const useEmployeeApi = () => {
  const [employeeList, setEmployeeList] = useState<Array<EmployeeDto>>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const requestHandleDecorator = useMemo(() => getRequestErrorHandleDecorator({ setErrorMessage }), []);

  const getEmployeeList = useCallback(
    requestHandleDecorator(async () => {
      const response = await EMPLOYEE_API.employeeList();
      setEmployeeList(response.data);
    }),
    [],
  );

  const createEmployee = useCallback(
    requestHandleDecorator(async (employee: EmployeeDto) => {
      await EMPLOYEE_API.employeeCreate(employee);
    }),
    [],
  );

  return {
    employeeList,
    getEmployeeList,
    createEmployee,
    errorMessage,
  };
};
