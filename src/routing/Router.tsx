import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ROUTES } from './routes.const';
import { EmployeeList, EmployeeForm } from '../employee';

export const ROUTER = createBrowserRouter([
  {
    path: ROUTES.EMPLOYEE_LIST,
    element: <EmployeeList />,
  },
  {
    path: ROUTES.EMPLOYEE_VIEW,
    element: <EmployeeForm />,
  },
  {
    path: '*',
    element: <Navigate to={ROUTES.EMPLOYEE_LIST} />,
  },
]);
