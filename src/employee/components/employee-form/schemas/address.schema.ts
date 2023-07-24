import * as Yup from 'yup';

export const ADDRESS = Yup.object().shape({
  streetName: Yup.string().required('Street name is required!'),
  postalCode: Yup.string().required('Postal code is required!'),
  apartmentNumber: Yup.number().integer('Apartment number has to be a number!').min(1).required('Apartment number is required!'),
  state: Yup.string().required('State is required!'),
  country: Yup.string().required('Country is required!'),
});
