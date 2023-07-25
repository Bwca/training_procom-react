import { useCallback, useEffect, useState } from 'react';

import { Subject } from 'rxjs';

import { GetterSetterPair } from './models';

export const subjectStateHookFactory =
  <T, STATE extends string, SETTER extends string>(subject$: Subject<T>, stateName: STATE, setterName: SETTER, initialState?: T) =>
  (): GetterSetterPair<T, STATE, SETTER> => {
  console.log('called for', stateName, setterName)
    const [state, set] = useState<T>(initialState as T);

    useEffect(() => {
      const subscription = subject$.subscribe((s) => set(s));
      return () => {
        console.log('unmounted, destroying');
        subscription.unsubscribe();
      };
    }, []);

    const setState = useCallback((s: T) => {
      subject$.next(s);
    }, []);

    return { [stateName]: state, [setterName]: setState } as GetterSetterPair<T, STATE, SETTER>;
  };
