import { FC, useCallback, useEffect } from 'react';

import { useFieldArray, useForm } from 'react-hook-form';
import { TextFieldProps } from '@mui/material/TextField/TextField';

import { EmployeeFormProps } from '../../models';
import { EmployeeDto } from '../../../../../api';
import { EmployeeFormElement } from '../employee-form-element';

export const EmployeeHookForm: FC<EmployeeFormProps> = ({ dto, onSubmit }) => {
  const { register, control, handleSubmit } = useForm({});
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'addresses',
  });

  const addAddressRow = useCallback(() => append({}), [append]);
  const removeAddressRow = useCallback((i: number) => () => remove(i), [remove]);

  useEffect(() => {
    if (!fields.length) {
      addAddressRow();
    }
  }, []);

  const handleFormSubmit = handleSubmit((data: Partial<EmployeeDto>) => {
    onSubmit({
      ...data,
      addresses: data.addresses?.map((a) => ({ ...a, apartmentNumber: Number(a?.apartmentNumber) || a?.apartmentNumber })),
    });
  });

  const registerFormField = useCallback((fieldName: string): TextFieldProps => {
    return register(fieldName);
  }, []);

  return (
    <>
      <i>hook form implementation</i>
      <EmployeeFormElement
        handleFormSubmit={handleFormSubmit}
        registerFormField={registerFormField}
        addresses={fields}
        removeAddressRow={removeAddressRow}
        addAddressRow={addAddressRow}
      />
    </>
  );
};
