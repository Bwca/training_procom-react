import { useCallback, useEffect, useState } from 'react';

import { AxiosError } from 'axios';

import { useNotification } from '../../../notification';
import { FunctionWithArguments, RequestDecoratorPayload } from './models';

export const useGetRequestErrorHandleDecorator = () => {
  const [isInProgress, setIsInProgress] = useState(false);
  const [requestCount, setRequestCount] = useState(0);
  const { setNotification } = useNotification();

  useEffect(() => {
    setIsInProgress(requestCount > 0);
  }, [requestCount]);

  const requestHandleDecorator = useCallback(
    <P = AxiosError<string>, F extends FunctionWithArguments = FunctionWithArguments>({
      generateProblemMessage,
      successMessage,
      func,
    }: RequestDecoratorPayload<P, F>) => {
      return async (...args: Parameters<F>): Promise<void> => {
        try {
          setRequestCount((prevCount) => prevCount + 1);
          await func(...args);

          if (successMessage) {
            setNotification({
              text: successMessage,
              type: 'success',
            });
          }
        } catch (e) {
          if (generateProblemMessage) {
            const error = e as P;
            const problemMessage = generateProblemMessage(error);

            setNotification({
              text: problemMessage,
              type: 'error',
            });
          } else {
            console.error(e);
          }
        } finally {
          setRequestCount((prevCount) => Math.max(prevCount - 1, 0));
        }
      };
    },
    [setNotification],
  );

  return { requestHandleDecorator, isInProgress };
};
