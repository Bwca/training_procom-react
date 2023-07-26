import { useCallback, useEffect, useState } from 'react';

import { Subject } from 'rxjs';

import { GetterSetterPair } from './models';

export const subjectStateHookFactory = <T, STATE extends string, SETTER extends string>(
  subject$: Subject<T>,
  stateName: STATE,
  setterName: SETTER,
  initialState?: T,
) => {
  return (): GetterSetterPair<T, STATE, SETTER> => {
    const [state, set] = useState<T>(initialState as T);

    useEffect(() => {
      const subscription = subject$.subscribe((s) => set(s));
      return () => {
        subscription.unsubscribe();
      };
    }, []);

    const setState = useCallback((s: T) => {
      subject$.next(s);
    }, []);

    return { [stateName]: state, [setterName]: setState } as GetterSetterPair<T, STATE, SETTER>;
  };
};
