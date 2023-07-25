import { AxiosError } from 'axios';

import { EmployeeDto } from '../../../../api';

export const STATE = {
  EMPLOYEES: [] as EmployeeDto[],
  addEmployee: async (employee: EmployeeDto): Promise<void> => {
    STATE.EMPLOYEES = STATE.EMPLOYEES.concat({ ...employee, id: Date.now() });
  },
  fineEmployee: async (employeeId: number): Promise<EmployeeDto> => {
    const employee = STATE.EMPLOYEES.find(({ id }) => employeeId === id);
    if (employee) {
      return employee;
    }
    throw new AxiosError('Does not exist', '404');
  },

  deleteEmployee: async (employeeId: number): Promise<void> => {
    STATE.EMPLOYEES = STATE.EMPLOYEES.filter(({ id }) => id !== employeeId);
  },

  updateEmployee: async (employee: EmployeeDto): Promise<EmployeeDto> => {
    STATE.EMPLOYEES = STATE.EMPLOYEES.filter(({ id }) => id !== employee.id).concat(employee);
    return employee;
  },
};
