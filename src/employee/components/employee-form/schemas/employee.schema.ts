import * as Yup from 'yup';

import { ADDRESS } from './address.schema';

export const EMPLOYEE = Yup.object().shape({
  id: Yup.number().integer().positive().nullable(),
  firstName: Yup.string().required('First name is required!'),
  lastName: Yup.string().required('Last name is required!'),
  email: Yup.string().email('Incorrect email format!').required('Email is required!'),
  phoneNumber: Yup.string().required('Phone number is required!'),
  addresses: Yup.array().of(ADDRESS),
});
