import { useContext } from 'react';

import { NotificationContext } from '../contexts';

export const useNotification = () => {
  const context = useContext(NotificationContext);

  if (context === undefined) {
    throw new Error('useCount must be used within a NotificationProvider');
  }
  return context;
};
