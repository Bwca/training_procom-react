import { FC, useCallback } from 'react';

import { Button } from '@mui/material';

import { useEmployeeApi, useConfirmationDialog } from '../../hooks';
import { DeleteEmployeeButtonProps } from './models';

export const DeleteEmployeeButton: FC<DeleteEmployeeButtonProps> = ({ id, onDelete }) => {
  const { deleteEmployee } = useEmployeeApi();

  const handleDeleteEmployee = useCallback(async () => {
    await deleteEmployee(id);
    onDelete();
  }, [deleteEmployee, onDelete, id]);

  const { openDialog, ConfirmationDialog } = useConfirmationDialog({
    onConfirm: handleDeleteEmployee,
    cancellationText: 'Cancel',
    confirmationText: 'Yes, delete the user',
    modalTitle: 'Delete user',
    modalBody: 'Are you sure you would like to delete the user? The action cannot be undone.',
  });

  return (
    <>
      <Button onClick={openDialog} type="button" color="warning">
        delete
      </Button>
      <ConfirmationDialog />
    </>
  );
};
