import { FC, useCallback, useEffect } from 'react';

import { useFormik } from 'formik';
import { TextFieldProps } from '@mui/material/TextField/TextField';

import { EmployeeFormProps } from '../../models';
import { EmployeeDto } from '../../../../../api';
import { EmployeeFormElement } from '../employee-form-element';

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

  const { values, handleSubmit, handleChange, handleBlur, setFieldValue, getFieldProps } = formik;
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
    (fieldName: string): TextFieldProps => {
      return {
        name: fieldName,
        value: getFieldProps(fieldName).value,
        onChange: handleChange,
        onBlur: handleBlur,
      };
    },
    [handleChange, handleBlur, values, getFieldProps],
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
