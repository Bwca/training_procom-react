import { FC, useCallback } from 'react';

import { Alert } from '@mui/material';

import { useNotification } from '../hooks';

export const Notification: FC = () => {
  const { notification, setNotification } = useNotification();

  const eraseNotification = useCallback(() => {
    setNotification();
  }, [setNotification]);

  return (
    <>
      {notification && (
        <Alert
          onClose={eraseNotification}
          severity={notification.type}
          style={{
            position: 'fixed',
            top: '100px',
            zIndex: 9999,
            width: '80%',
            left: '10%'

          }}
        >
          {notification.text}
        </Alert>
      )}
    </>
  );
};
