import { FC } from 'react';
import { EmployeeFormProps } from '../../models';
import { ENVIRONMENT } from '../../../../../constants';
import { EmployeeHookForm } from '../employee-hook-form';

export const EmployeeFormComponent: FC<EmployeeFormProps> =
  ENVIRONMENT.REACT_APP_FORM_MODE === 'hook' ? EmployeeHookForm : EmployeeHookForm;
