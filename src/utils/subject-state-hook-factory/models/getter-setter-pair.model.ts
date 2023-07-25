export type GetterSetterPair<T, STATE extends string, SETTER extends string> = Record<STATE, T> & Record<SETTER, (s: T) => void>;
