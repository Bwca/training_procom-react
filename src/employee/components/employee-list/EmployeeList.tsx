import { FC, useEffect } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { useEmployeeApi } from '../../hooks';

export const EmployeeList: FC = () => {
  const { employeeList, getEmployeeList } = useEmployeeApi();

  useEffect(() => {
    void getEmployeeList();
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h3"
        component="h3"
        sx={{
          margin: '40px 0',
        }}
      >
        Employee List
      </Typography>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
