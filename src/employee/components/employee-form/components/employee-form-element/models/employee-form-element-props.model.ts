import { FormEventHandler, MouseEventHandler } from 'react';

import { TextFieldProps } from '@mui/material/TextField/TextField';

import { FormFieldName } from '../../../models';

export interface EmployeeFormElementProps {
  handleFormSubmit: FormEventHandler<HTMLFormElement>;
  registerFormField: (fieldName: FormFieldName) => TextFieldProps;
  addresses: { id: string }[];
  addAddressRow: MouseEventHandler<HTMLButtonElement>;
  removeAddressRow: (i: number) => MouseEventHandler<HTMLButtonElement>;
}
