import { subjectStateHookFactory } from '../../../utils';
import { EmployeeDto } from '../../../api';

export const useEmployee = subjectStateHookFactory<EmployeeDto | null>('employee', null);
