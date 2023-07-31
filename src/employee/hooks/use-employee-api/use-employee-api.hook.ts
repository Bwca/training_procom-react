import { useCallback, useEffect, useMemo, useRef } from 'react';

import { EMPLOYEE_API, EmployeeDto } from '../../../api';
import { useGetRequestErrorHandleDecorator } from '../use-get-request-handle-decorator';
import { extractErrorMessage } from './utils';
import { useEmployee } from '../use-employee';
import { useEmployeeList } from '../use-employee-list';

export const useEmployeeApi = (successCallback?: () => void) => {
  const { setEmployee, employee } = useEmployee();
  const { setEmployeeList, employeeList } = useEmployeeList();

  const { requestHandleDecorator, isInProgress } = useGetRequestErrorHandleDecorator();

  const requestControllers = useRef<Array<AbortController>>([]);

  useEffect(() => {
    return () => {
      requestControllers.current.forEach((c) => c.abort());
    };
  }, []);

  const { addAbortController, removeAbortController } = useMemo(() => {
    const addAbortController = () => {
      const controller = new AbortController();
      requestControllers.current.push(controller);
      return controller;
    };
    const removeAbortController = (controller: AbortController) => {
      requestControllers.current = requestControllers.current.filter((c) => c !== controller);
    };

    return { addAbortController, removeAbortController };
  }, []);

  const getEmployeeList = useCallback(
    requestHandleDecorator({
      func: async () => {
        const controller = addAbortController();
        const response = await EMPLOYEE_API.employeeList({
          signal: controller.signal,
        });
        setEmployeeList(response.data);
        removeAbortController(controller);
      },
    }),
    [requestHandleDecorator, successCallback],
  );

  const createEmployee = useCallback(
    requestHandleDecorator({
      func: async (employee: EmployeeDto) => {
        const controller = addAbortController();
        await EMPLOYEE_API.employeeCreate(employee, {
          signal: controller.signal,
        });
        successCallback?.();
        removeAbortController(controller);
      },
      successMessage: 'Employee created!',
      generateProblemMessage: extractErrorMessage,
    }),
    [requestHandleDecorator, successCallback, extractErrorMessage],
  );

  const getEmployeeById = useCallback(
    requestHandleDecorator({
      func: async (id: number) => {
        const controller = addAbortController();
        const response = await EMPLOYEE_API.employeeDetail(id, {
          signal: controller.signal,
        });
        setEmployee(response.data);
        removeAbortController(controller);
      },
      generateProblemMessage: extractErrorMessage,
    }),
    [requestHandleDecorator, extractErrorMessage],
  );

  const deleteEmployee = useCallback(
    requestHandleDecorator({
      func: async (id: number) => {
        const controller = addAbortController();
        await EMPLOYEE_API.employeeDelete(id, {
          signal: controller.signal,
        });
        removeAbortController(controller);
      },
      successMessage: `Employee has been deleted!`,
      generateProblemMessage: extractErrorMessage,
    }),
    [requestHandleDecorator, extractErrorMessage],
  );

  const updateEmployee = useCallback(
    requestHandleDecorator({
      func: async (id: number, employee: EmployeeDto) => {
        const controller = addAbortController();
        const response = await EMPLOYEE_API.employeeUpdate(id, employee, {
          signal: controller.signal,
        });
        setEmployee(response.data);
        successCallback?.();
        removeAbortController(controller);
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
