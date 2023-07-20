import { useCallback, useEffect, useState } from 'react';

export const useGetRequestErrorHandleDecorator = (setErrorMessage: (e: string | null) => void) => {
  const [isInProgress, setIsInProgress] = useState(false);
  const [requestCount, setRequestCount] = useState(0);

  useEffect(() => {
    setIsInProgress(requestCount > 0);
  }, [requestCount]);

  const requestHandleDecorator = useCallback(
    <F extends FunctionWithArguments>(func: F) => {
      return async (...args: Parameters<F>): Promise<void> => {
        try {
          setRequestCount((prevCount) => prevCount + 1);
          await func(...args);
          setErrorMessage(null);
        } catch (e) {
          console.error(e);
          setErrorMessage('An error has occurred!' + (e as any).toString());
        } finally {
          setRequestCount((prevCount) => Math.max(prevCount - 1, 0));
        }
      };
    },
    [setErrorMessage],
  );

  return { requestHandleDecorator, isInProgress };
};

interface FunctionWithArguments {
  (...args: any): Promise<any>;
}
