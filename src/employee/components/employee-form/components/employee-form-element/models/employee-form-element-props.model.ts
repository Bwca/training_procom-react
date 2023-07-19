import { FormEventHandler, MouseEventHandler } from 'react';

import { TextFieldProps } from '@mui/material/TextField/TextField';

export interface EmployeeFormElementProps {
  handleFormSubmit: FormEventHandler<HTMLFormElement>;
  registerFormField: (fieldName: string) => TextFieldProps;
  addresses: { id: string }[];
  addAddressRow: MouseEventHandler<HTMLButtonElement>;
  removeAddressRow: (i: number) => MouseEventHandler<HTMLButtonElement>;
}
