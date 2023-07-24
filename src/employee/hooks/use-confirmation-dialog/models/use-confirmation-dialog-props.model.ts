export interface UseConfirmationDialogProps {
  onConfirm: () => void;
  onReject?: () => void;
  modalTitle: string;
  modalBody: string;
  confirmationText: string;
  cancellationText: string;
}
