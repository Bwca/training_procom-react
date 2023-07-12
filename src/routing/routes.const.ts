export const ROUTES = {
  EMPLOYEE_LIST: 'employee-list',
} as const;

type RoutePath = (typeof ROUTES)[keyof typeof ROUTES];
