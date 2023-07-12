import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ROUTES } from './routes.const';
import { EmployeeList } from '../employee-list';

export const ROUTER = createBrowserRouter([
  {
    path: ROUTES.EMPLOYEE_LIST,
    element: <EmployeeList />,
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.EMPLOYEE_LIST} />,
  },
]);
