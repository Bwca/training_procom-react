import { useCallback, useState } from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import { UseConfirmationDialogProps } from './models';

export const useConfirmationDialog = ({
  onConfirm,
  onReject,
  confirmationText,
  cancellationText,
  modalTitle,
  modalBody,
}: UseConfirmationDialogProps) => {
  const [open, setOpen] = useState(false);

  const openDialog = useCallback(() => {
    setOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setOpen(false);
  }, []);

  const confirm = useCallback(() => {
    onConfirm();
    closeDialog();
  }, [onConfirm, closeDialog]);

  const reject = useCallback(() => {
    onReject?.();
    closeDialog();
  }, [onReject, closeDialog]);

  const ConfirmationDialog = useCallback(
    () => (
      <Dialog open={open} onClose={closeDialog}>
        <DialogTitle>{modalTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>{modalBody}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={reject} autoFocus>
            {cancellationText}
          </Button>
          <Button color="primary" onClick={confirm}>
            {confirmationText}
          </Button>
        </DialogActions>
      </Dialog>
    ),
    [confirm, reject, closeDialog, open, confirmationText, cancellationText, modalTitle, modalBody],
  );

  return {
    ConfirmationDialog,
    openDialog,
    closeDialog,
  };
};
