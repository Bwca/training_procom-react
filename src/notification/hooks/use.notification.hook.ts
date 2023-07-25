import { useCallback, useEffect, useState } from 'react';

import { Subject } from 'rxjs';

import { Message, NotificationContext } from '../models';

const message$ = new Subject<Message | undefined>();

export const useNotification = (): NotificationContext => {
  const [message, setMessage] = useState<Message | undefined>();

  useEffect(() => {
    const subscription = message$.subscribe((m) => setMessage(m));
    return () => subscription.unsubscribe();
  }, []);

  const setNotification = useCallback((message?: Message) => {
    message$.next(message);
  }, []);

  return { notification: message, setNotification };
};
