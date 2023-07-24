import { FC, useCallback, useEffect } from 'react';

import { useFormik } from 'formik';
import { TextFieldProps } from '@mui/material/TextField/TextField';

import { EmployeeFormProps, FormFieldName } from '../../models';
import { EmployeeDto } from '../../../../../api';
import { EmployeeFormElement } from '../employee-form-element';
import { EMPLOYEE } from '../../schemas';
import { extractErrorFromErrorObject } from '../../utils';

export const EmployeeFormikForm: FC<EmployeeFormProps> = ({ employee, onSubmit }) => {
  const initialValues: Partial<EmployeeDto> = employee
    ? employee
    : {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        addresses: [],
      };

  const formik = useFormik({
    validationSchema: EMPLOYEE,
    initialValues,
    onSubmit: (values) => {
      const updatedAddresses = values.addresses?.map((a: any) => ({
        ...a,
        apartmentNumber: Number(a?.apartmentNumber) || a?.apartmentNumber,
      }));

      onSubmit({
        ...values,
        addresses: updatedAddresses,
      });
    },
  });

  const { values, handleSubmit, handleChange, handleBlur, setFieldValue, getFieldProps, errors, touched } = formik;
  const { addresses } = values;

  const addAddressRow = useCallback(() => {
    setFieldValue('addresses', [...(addresses ?? []), { streetName: '', postalCode: '', apartmentNumber: '', state: '', country: '' }]);
  }, [addresses, setFieldValue]);

  const removeAddressRow = useCallback(
    (index: number) => () => {
      setFieldValue('addresses', addresses?.filter((_, i) => i !== index));
    },
    [addresses, setFieldValue],
  );

  useEffect(() => {
    if (!addresses?.length) {
      addAddressRow();
    }
  }, []);

  const registerFormField = useCallback(
    (fieldName: FormFieldName): TextFieldProps => {
      const error = extractErrorFromErrorObject(fieldName, errors);
      const fieldProps = getFieldProps(fieldName);
      const hasBeenTouched: boolean = fieldName.split('.').reduce((a: any, b: string) => a?.[b], touched);
      return {
        name: fieldName,
        value: fieldProps.value,
        onChange: handleChange,
        onBlur: handleBlur,
        helperText: hasBeenTouched ? error : undefined,
        error: hasBeenTouched && !!error,
      };
    },
    [handleChange, handleBlur, values, getFieldProps, errors, extractErrorFromErrorObject, touched],
  );

  return (
    <>
      <i>formik implementation</i>
      <EmployeeFormElement
        handleFormSubmit={handleSubmit}
        registerFormField={registerFormField}
        addresses={addresses?.map((i, j) => ({ id: j.toString() })) || []}
        removeAddressRow={removeAddressRow}
        addAddressRow={addAddressRow}
      />
    </>
  );
};
