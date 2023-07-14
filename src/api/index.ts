import { Employee } from './Employee';
import { HttpClient } from './http-client';

export * from './data-contracts';
export const EMPLOYEE_API = new Employee(new HttpClient());
