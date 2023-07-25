import { GridValueGetterParams } from '@mui/x-data-grid';
import { EmployeeDto } from '../../../../api';

export const addressValueGetter = (params: GridValueGetterParams<Pick<EmployeeDto, 'addresses'>>): string =>
  params.row.addresses
    ?.map((address) =>
      [address.apartmentNumber, address.streetName, address.state, address.country, address.postalCode].filter(Boolean).join(', ')
    )
    .join('\n') ?? '';
