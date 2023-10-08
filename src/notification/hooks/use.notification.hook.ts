import { Message } from '../models';
import { subjectStateHookFactory } from '../../utils';

export const useNotification = subjectStateHookFactory<Message>('notification');
