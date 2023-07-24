import { FC, useState } from 'react';

import { Message } from '../models';
import { NotificationContext } from './notification.context';

export const NotificationProvider: FC<any> = ({ children }) => {
  const [message, setMessage] = useState<Message | undefined>();

  return (
    <NotificationContext.Provider
      value={{
        setNotification: setMessage,
        notification: message,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
