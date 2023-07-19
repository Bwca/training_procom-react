import { FC, Fragment, useCallback, useEffect } from 'react';

import { useFieldArray, useForm } from 'react-hook-form';
import { Button, ButtonGroup, TextField, Typography } from '@mui/material';

import { EmployeeFormProps } from '../../models';
import { EmployeeDto } from '../../../../../api';

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

  const handleFormSubmit = (data: Partial<EmployeeDto>) => {
    onSubmit({
      ...data,
      addresses: data.addresses?.map((a) => ({ ...a, apartmentNumber: Number(a?.apartmentNumber) || a?.apartmentNumber })),
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Typography
          variant="h6"
          component="h6"
          sx={{
            margin: '10px 0',
          }}
        >
          Details
        </Typography>
        <TextField label="First Name" {...register('firstName')} fullWidth margin="dense" />
        <TextField variant="outlined" label="Last Name" {...register('lastName')} fullWidth margin="dense" />
        <TextField label="Email" {...register('email')} type="email" fullWidth margin="dense" />
        <TextField label="Phone Number" {...register('phoneNumber')} fullWidth margin="dense" />

        {fields.map((item, index) => (
          <Fragment key={item.id}>
            <Typography
              variant="h6"
              component="h6"
              sx={{
                margin: '10px 0',
              }}
            >
              Address
            </Typography>
            <TextField label="Street Name" {...register(`addresses.${index}.streetName`)} fullWidth margin="dense" />
            <TextField label="Postal Code" {...register(`addresses.${index}.postalCode`)} fullWidth margin="dense" />
            <TextField
              type="number"
              label="Apartment Number"
              {...register(`addresses.${index}.apartmentNumber`)}
              fullWidth
              margin="dense"
            />
            <TextField label="State" {...register(`addresses.${index}.state`)} fullWidth margin="dense" />
            <TextField label="Country" {...register(`addresses.${index}.country`)} fullWidth margin="dense" />
            <ButtonGroup variant="outlined" sx={{ display: 'flex' }}>
              {index === fields.length - 1 && (
                <Button type="button" onClick={addAddressRow}>
                  Add Address
                </Button>
              )}
              {!!index && (
                <Button type="button" color="warning" onClick={removeAddressRow(index)}>
                  Remove Address
                </Button>
              )}
            </ButtonGroup>
          </Fragment>
        ))}

        <ButtonGroup variant="outlined" sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained" color="primary">
            Create Employee
          </Button>
        </ButtonGroup>
      </form>
    </>
  );
};
