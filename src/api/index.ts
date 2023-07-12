import { Employee } from './Employee';
import { HttpClient } from './http-client';

export * from './data-contracts';
export const EmployeeApi = new Employee(new HttpClient());
