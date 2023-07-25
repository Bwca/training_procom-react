import { Subject } from 'rxjs';

import { subjectStateHookFactory } from '../../../utils';
import { EmployeeDto } from '../../../api';

export const useEmployeeList = subjectStateHookFactory(new Subject<Array<EmployeeDto>>(), 'employeeList', 'setEmployeeList', []);
