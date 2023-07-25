import { useCallback, useState } from 'react';

import { AxiosError } from 'axios';

import { EmployeeDto } from '../../../api';
import { useGetRequestErrorHandleDecorator } from '../use-get-request-handle-decorator';
import { extractErrorMessage } from '../use-employee-api/utils';
import { useEmployeeApi } from '../use-employee-api';

class State {
  static EMPLOYEES: EmployeeDto[] = [];
  static async addEmployee(employee: EmployeeDto): Promise<void> {
    State.EMPLOYEES = State.EMPLOYEES.concat({ ...employee, id: Date.now() });
  }

  static async fineEmployee(employeeId: number): Promise<EmployeeDto> {
    const employee = State.EMPLOYEES.find(({ id }) => employeeId === id);
    if (employee) {
      return employee;
    }
    throw new AxiosError('Does not exist', '404');
  }

  static async deleteEmployee(employeeId: number): Promise<void> {
    State.EMPLOYEES = State.EMPLOYEES.filter(({ id }) => id !== employeeId);
  }

  static async updateEmployee(employee: EmployeeDto): Promise<EmployeeDto> {
    State.EMPLOYEES = State.EMPLOYEES.filter(({ id }) => id !== employee.id).concat(employee);
    return employee;
  }
}

export const useFakeEmployeeApi: typeof useEmployeeApi = (successCallback?: () => void) => {
  const [employeeList, setEmployeeList] = useState<Array<EmployeeDto>>([]);
  const [employee, setEmployee] = useState<EmployeeDto | null>(null);

  const { requestHandleDecorator, isInProgress } = useGetRequestErrorHandleDecorator();

  const getEmployeeList = useCallback(
    requestHandleDecorator({
      func: async () => {
        setEmployeeList(State.EMPLOYEES.map((i) => ({ ...i, addresses: i?.addresses?.map((j) => ({ ...j })) })));
      },
    }),
    [requestHandleDecorator, successCallback],
  );

  const createEmployee = useCallback(
    requestHandleDecorator({
      func: async (employee: EmployeeDto) => {
        await State.addEmployee(employee);
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
        setEmployee(await State.fineEmployee(id));
      },
      generateProblemMessage: extractErrorMessage,
    }),
    [requestHandleDecorator, extractErrorMessage],
  );

  const deleteEmployee = useCallback(
    requestHandleDecorator({
      func: (id: number) => State.deleteEmployee(id),
      successMessage: `Employee has been deleted!`,
      generateProblemMessage: extractErrorMessage,
    }),
    [requestHandleDecorator, extractErrorMessage],
  );

  const updateEmployee = useCallback(
    requestHandleDecorator({
      func: async (id: number, employee: EmployeeDto) => {
        setEmployee(await State.updateEmployee(employee));
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
