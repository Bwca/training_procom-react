import { Navigate, Route, Routes } from 'react-router-dom';

import { ROUTES } from './routes.const';
import { EmployeeList, EmployeeForm } from '../employee';

export const AppRoutes = () => (
  <Routes>
    <Route path={ROUTES.EMPLOYEE_LIST} element={<EmployeeList />} />
    <Route path={ROUTES.EMPLOYEE_VIEW} element={<EmployeeForm />} />
    <Route path="*" element={<Navigate to={ROUTES.EMPLOYEE_LIST} />} />
  </Routes>
);
