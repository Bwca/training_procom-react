import { EmployeeDto } from '../../../../api';

export interface EmployeeFormProps {
  employee: Partial<EmployeeDto> | null;
  onSubmit: (dto: Partial<EmployeeDto>) => void;
}
