import { Subject } from 'rxjs';

import { subjectStateHookFactory } from '../../../utils';
import { EmployeeDto } from '../../../api';

export const useEmployee = subjectStateHookFactory(new Subject<EmployeeDto | null>(), 'employee', 'setEmployee', null);
