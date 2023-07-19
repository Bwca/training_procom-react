import { EmployeeDto } from '../../../../api';

export interface EmployeeFormProps {
  dto?: Partial<EmployeeDto>;
  onSubmit: (dto: Partial<EmployeeDto>) => void;
}
