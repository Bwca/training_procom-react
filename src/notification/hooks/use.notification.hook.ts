import { Subject } from 'rxjs';

import { Message } from '../models';
import { subjectStateHookFactory } from '../../utils';

export const useNotification = subjectStateHookFactory(new Subject<Message | void>(), 'notification', 'setNotification');
