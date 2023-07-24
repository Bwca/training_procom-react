import { createContext } from 'react';

import { Message } from '../models';
import { NotificationContextModel } from '../models';

export const NotificationContext = createContext<NotificationContextModel>({
  setNotification: (m?: Message) => {},
});
