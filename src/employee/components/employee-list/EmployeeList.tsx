import { FC, useEffect } from 'react';

import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import { useEmployeeApi } from '../../hooks';
import { DeleteEmployeeButton } from '../delete-employee-button';
import { EditEmployeeButton } from '../edit-employee-button';

export const EmployeeList: FC = () => {
  const { employeeList, getEmployeeList, isInProgress } = useEmployeeApi();

  useEffect(() => {
    void getEmployeeList();
  }, [getEmployeeList]);

  return (
    <>
      <Typography
        variant="h3"
        component="h3"
        sx={{
          margin: '40px 0',
        }}
      >
        Employee List
      </Typography>
      {isInProgress ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} sx={{ maxWidth: 1200, margin: 'auto' }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Addresses</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employeeList.map((employee) => (
                <TableRow key={employee.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component="th" scope="row">
                    {employee.id}
                  </TableCell>
                  <TableCell>{employee.firstName}</TableCell>
                  <TableCell>{employee.lastName}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.phoneNumber}</TableCell>
                  <TableCell>
                    {employee.addresses?.map((address, idx) => (
                      <p key={idx}>
                        {[address.apartmentNumber, address.streetName, address.state, address.country, address.postalCode]
                          .filter(Boolean)
                          .join(', ')}
                      </p>
                    ))}
                  </TableCell>
                  <TableCell>
                    <EditEmployeeButton id={employee.id!} />
                    <DeleteEmployeeButton id={employee.id!} onDelete={getEmployeeList} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};
