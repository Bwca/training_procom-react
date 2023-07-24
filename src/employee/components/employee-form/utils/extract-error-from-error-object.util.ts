import { FormikErrors } from 'formik';
import { FieldError, FieldErrors } from 'react-hook-form';

import { FormFieldName } from '../models';

export const extractErrorFromErrorObject = <ERRORS extends FormikErrors<any> | FieldErrors<any>>(
  fieldName: FormFieldName,
  errors: ERRORS,
): ERRORS extends FormikErrors<any> ? string | undefined : FieldError | undefined => {
  return fieldName.split('.').reduce((a: any, b: string) => a?.[b], errors);
};
