import { AxiosError } from 'axios';

export const extractErrorMessage = (error: AxiosError<string>) => error.response?.data ?? error.message;
