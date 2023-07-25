import { Message } from './message.model';

export interface NotificationContext {
  setNotification: (m?: Message) => void;
  notification?: Message;
}
