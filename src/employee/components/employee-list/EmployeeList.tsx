import { FC, useEffect } from 'react';

import { CircularProgress, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { useEmployeeApi } from '../../hooks';
import { DeleteEmployeeButton } from '../delete-employee-button';
import { EditEmployeeButton } from '../edit-employee-button';
import { addressValueGetter } from './utils';

export const EmployeeList: FC = () => {
  const { employeeList, getEmployeeList, isInProgress } = useEmployeeApi();

  useEffect(() => {
    void getEmployeeList();
  }, [getEmployeeList]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', flex: 1 },
    { field: 'firstName', headerName: 'First Name', flex: 1 },
    { field: 'lastName', headerName: 'Last Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'phoneNumber', headerName: 'Phone Number', flex: 1 },
    {
      field: 'addresses',
      headerName: 'Addresses',
      flex: 1,
      valueGetter: addressValueGetter,
    },

    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <>
          <EditEmployeeButton id={params.id as number} />
          <DeleteEmployeeButton id={params.id as number} onDelete={getEmployeeList} />
        </>
      ),
    },
  ];

  return (
    <>
      <Typography variant="h3" component="h3" sx={{ margin: '40px 0' }}>
        Employee List
      </Typography>
      {isInProgress ? (
        <CircularProgress />
      ) : (
        <div style={{ height: 400, width: '100%', marginBottom: '40px' }}>
          <DataGrid rows={employeeList} columns={columns} />
        </div>
      )}
    </>
  );
};
