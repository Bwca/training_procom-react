import { FC, useCallback } from 'react';

import { Button } from '@mui/material';

import { useEmployeeApi } from '../../hooks';
import { DeleteEmployeeButtonProps } from './models';

export const DeleteEmployeeButton: FC<DeleteEmployeeButtonProps> = ({ id, onDelete }) => {
  const { deleteEmployee } = useEmployeeApi();

  const handleDeleteEmployee = useCallback(async () => {
    await deleteEmployee(id);
    onDelete();
  }, [deleteEmployee, onDelete, id]);

  return (
    <Button onClick={handleDeleteEmployee} type="button" color="warning">
      delete
    </Button>
  );
};
