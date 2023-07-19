import { FC, Fragment } from 'react';

import { Button, ButtonGroup, TextField, Typography } from '@mui/material';

import { EmployeeFormElementProps } from './models';

export const EmployeeFormElement: FC<EmployeeFormElementProps> = ({
  handleFormSubmit,
  registerFormField,
  addresses,
  removeAddressRow,
  addAddressRow,
}) => {
  return (
    <form onSubmit={handleFormSubmit}>
      <Typography
        variant="h6"
        component="h6"
        sx={{
          margin: '10px 0',
        }}
      >
        Details
      </Typography>
      <TextField label="First Name" {...registerFormField('firstName')} fullWidth margin="dense" />
      <TextField variant="outlined" label="Last Name" {...registerFormField('lastName')} fullWidth margin="dense" />
      <TextField label="Email" {...registerFormField('email')} type="email" fullWidth margin="dense" />
      <TextField label="Phone Number" {...registerFormField('phoneNumber')} fullWidth margin="dense" />

      {addresses.map((item, index) => (
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
          <TextField label="Street Name" {...registerFormField(`addresses.${index}.streetName`)} fullWidth margin="dense" />
          <TextField label="Postal Code" {...registerFormField(`addresses.${index}.postalCode`)} fullWidth margin="dense" />
          <TextField
            type="number"
            label="Apartment Number"
            {...registerFormField(`addresses.${index}.apartmentNumber`)}
            fullWidth
            margin="dense"
          />
          <TextField label="State" {...registerFormField(`addresses.${index}.state`)} fullWidth margin="dense" />
          <TextField label="Country" {...registerFormField(`addresses.${index}.country`)} fullWidth margin="dense" />
          <ButtonGroup variant="outlined" sx={{ display: 'flex' }}>
            {index === addresses.length - 1 && (
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
  );
};
