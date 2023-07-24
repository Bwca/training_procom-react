import { AddressDto, EmployeeDto } from '../../../../api';

export type FormFieldName =
  | `${keyof Omit<EmployeeDto, 'addresses'>}`
  | `${keyof Pick<EmployeeDto, 'addresses'>}.${number}.${keyof AddressDto}`;
