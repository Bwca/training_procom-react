import { FC, useCallback, useEffect } from 'react';

import { useFieldArray, useForm } from 'react-hook-form';
import { TextFieldProps } from '@mui/material/TextField/TextField';

import { EmployeeFormProps } from '../../models';
import { EmployeeDto } from '../../../../../api';
import { EmployeeFormElement } from '../employee-form-element';

export const EmployeeHookForm: FC<EmployeeFormProps> = ({ employee, onSubmit }) => {
  const { register, control, handleSubmit } = useForm<EmployeeDto>({
    defaultValues: !employee
      ? {}
      : {
          id: employee.id,
          email: employee.email,
          lastName: employee.lastName,
          firstName: employee.firstName,
          phoneNumber: employee.phoneNumber,
          addresses: employee.addresses,
        },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'addresses',
  });

  const addAddressRow = useCallback(() => append({}), [append]);
  const removeAddressRow = useCallback((i: number) => () => remove(i), [remove]);

  useEffect(function addEmptyAddressRowOnLoad() {
    if (!fields.length) {
      addAddressRow();
    }
    // has to fire only once, no dependencies requirements here
  }, []);

  const handleFormSubmit = handleSubmit((data: Partial<EmployeeDto>) => {
    onSubmit({
      ...data,
      addresses: data.addresses?.map((a) => ({ ...a, apartmentNumber: Number(a?.apartmentNumber) || a?.apartmentNumber })),
    });
  });

  const registerFormField = useCallback(
    (fieldName: string): TextFieldProps => {
      return register(fieldName as keyof EmployeeDto);
    },
    [register],
  );

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
