import { FC, useCallback, useEffect } from 'react';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { generatePath, useNavigate } from 'react-router-dom';

import { useEmployeeApi } from '../../hooks';
import { ROUTES } from '../../../routing';

export const EmployeeList: FC = () => {
  const { employeeList, getEmployeeList } = useEmployeeApi();

  useEffect(() => {
    void getEmployeeList();
  }, [getEmployeeList]);

  const navigate = useNavigate();

  const goToPage = useCallback(
    (id: number) => () => {
      navigate(generatePath(ROUTES.EMPLOYEE_VIEW, { id: id.toString() }));
    },
    [navigate, generatePath],
  );

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
              <TableRow key={employee.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onClick={goToPage(employee.id!)}>
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
    </>
  );
};
