import { subjectStateHookFactory } from '../../../utils';
import { EmployeeDto } from '../../../api';

export const useEmployeeList = subjectStateHookFactory<Array<EmployeeDto>>('employeeList', []);
