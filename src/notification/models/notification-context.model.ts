import { Message } from './message.model';

export interface NotificationContextModel {
  setNotification: (m?: Message) => void;
  notification?: Message;
}
