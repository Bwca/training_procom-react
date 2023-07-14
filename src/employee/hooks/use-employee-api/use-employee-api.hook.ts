import { useCallback, useMemo, useState } from 'react';

import { EMPLOYEE_API, EmployeeDto } from '../../../api';
import { getRequestErrorHandleDecorator } from '../utils';

export const useEmployeeApi = () => {
  const [employeeList, setEmployeeList] = useState<Array<EmployeeDto>>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const requestHandleDecorator = useMemo(() => getRequestErrorHandleDecorator({ setErrorMessage }), []);

  const getEmployeeList = useCallback(
    requestHandleDecorator(async () => {
      const employeeListResponse = await EMPLOYEE_API.employeeList();
      setEmployeeList(employeeListResponse.data);
    }),
    [],
  );

  return {
    employeeList,
    getEmployeeList,
    errorMessage,
  };
};
