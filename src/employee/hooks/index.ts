import { useEmployeeApi as realApiHook } from './use-employee-api';
import { useFakeEmployeeApi as fakeApiHook } from './use-fake-employee-api';
import { ENVIRONMENT } from '../../constants';
export { useConfirmationDialog } from './use-confirmation-dialog';
export const useEmployeeApi: typeof realApiHook = ENVIRONMENT.REACT_APP_API_MODE === 'fake' ? fakeApiHook : realApiHook;
