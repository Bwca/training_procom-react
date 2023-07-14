export const getRequestErrorHandleDecorator = ({ setErrorMessage }: { setErrorMessage: (e: string | null) => void }) => {
  return <F extends FunctionWithArguments>(func: F) => {
    return async (...args: Parameters<F>): Promise<void> => {
      try {
        await func(args);
        setErrorMessage(null);
      } catch (e) {
        console.error(e);
        setErrorMessage('An error has occurred!' + (e as any).toString());
      }
    };
  };
};

interface FunctionWithArguments {
  (...args: any): Promise<any>;
}
