import { useCallback, useState } from 'react';

import { EMPLOYEE_API, EmployeeDto } from '../../../api';
import { useGetRequestErrorHandleDecorator } from '../use-get-request-handle-decorator';

export const useEmployeeApi = () => {
  const [employeeList, setEmployeeList] = useState<Array<EmployeeDto>>([]);
  const [employee, setEmployee] = useState<EmployeeDto | null>(null);
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

  const getEmployeeById = useCallback(
    requestHandleDecorator(async (id: number) => {
      const response = await EMPLOYEE_API.employeeDetail(id);
      setEmployee(response.data);
    }),
    [requestHandleDecorator],
  );

  const deleteEmployee = useCallback(
    requestHandleDecorator((id: number) => EMPLOYEE_API.employeeDelete(id)),
    [requestHandleDecorator],
  );

  const updateEmployee = useCallback(
    requestHandleDecorator(async (id: number, employee: EmployeeDto) => {
      const response = await EMPLOYEE_API.employeeUpdate(id, employee);
      setEmployee(response.data);
    }),
    [requestHandleDecorator],
  );

  return {
    createEmployee,
    deleteEmployee,
    employee,
    employeeList,
    errorMessage,
    getEmployeeById,
    getEmployeeList,
    isInProgress,
    updateEmployee,
  };
};
