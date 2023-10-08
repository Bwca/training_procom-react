export type GetterSetterPair<T, S extends string> = {
  [K in S]: T;
} & {
  [K in `set${Capitalize<S>}`]: (s: T) => void;
};
