import { FC, useCallback, useEffect } from 'react';

import { Resolver, useFieldArray, useForm } from 'react-hook-form';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import { yupResolver } from '@hookform/resolvers/yup';

import { EmployeeFormProps, FormFieldName } from '../../models';
import { EmployeeDto } from '../../../../../api';
import { EmployeeFormElement } from '../employee-form-element';
import { EMPLOYEE } from '../../schemas';
import { extractErrorFromErrorObject } from '../../utils';

export const EmployeeHookForm: FC<EmployeeFormProps> = ({ employee, onSubmit }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeDto>({
    resolver: yupResolver(EMPLOYEE) as Resolver<EmployeeDto>,
    mode: 'onBlur',
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
    // eslint-disable-next-line
  }, []);

  const handleFormSubmit = handleSubmit((data: Partial<EmployeeDto>) => {
    onSubmit({
      ...data,
      addresses: data.addresses?.map((a) => ({ ...a, apartmentNumber: Number(a?.apartmentNumber) || a?.apartmentNumber })),
    });
  });

  const registerFormField = useCallback(
    (fieldName: FormFieldName): TextFieldProps => {
      const error = extractErrorFromErrorObject(fieldName, errors);

      return {
        ...register(fieldName as keyof EmployeeDto),
        helperText: error?.message,
        error: !!error,
      };
    },
    [register, errors],
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
