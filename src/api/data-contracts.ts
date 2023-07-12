/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AddressDto {
  streetName?: string | null;
  postalCode?: string | null;
  /** @format int32 */
  apartmentNumber?: number;
  state?: string | null;
  country?: string | null;
}

export interface EmployeeDto {
  /** @format int32 */
  id?: number;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  phoneNumber?: string | null;
  addresses?: AddressDto[] | null;
}

export interface ProblemDetails {
  type?: string | null;
  title?: string | null;
  /** @format int32 */
  status?: number | null;
  detail?: string | null;
  instance?: string | null;
  [key: string]: any;
}

export type EmployeeCreateError = ProblemDetails;

export type EmployeeDetailError = ProblemDetails;

export type EmployeeUpdateError = ProblemDetails;

export type EmployeeDeleteError = ProblemDetails;
