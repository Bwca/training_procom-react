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

import { EmployeeCreateError, EmployeeDeleteError, EmployeeDetailError, EmployeeDto, EmployeeUpdateError } from './data-contracts';
import { ContentType, HttpClient, RequestParams } from './http-client';

export class Employee<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Employee
   * @name EmployeeList
   * @summary Returns all the employees
   * @request GET:/Employee
   * @secure
   */
  employeeList = (params: RequestParams = {}) =>
    this.http.request<void, any>({
      path: `/Employee`,
      method: 'GET',
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Employee
   * @name EmployeeCreate
   * @summary Creates new Employee
   * @request POST:/Employee
   * @secure
   */
  employeeCreate = (data: EmployeeDto, params: RequestParams = {}) =>
    this.http.request<void, EmployeeCreateError>({
      path: `/Employee`,
      method: 'POST',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Employee
   * @name EmployeeDetail
   * @summary Returns one employee for provided id
   * @request GET:/Employee/{id}
   * @secure
   */
  employeeDetail = (id: number, params: RequestParams = {}) =>
    this.http.request<void, EmployeeDetailError>({
      path: `/Employee/${id}`,
      method: 'GET',
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Employee
   * @name EmployeeUpdate
   * @summary Edits existing Employee
   * @request PUT:/Employee/{id}
   * @secure
   */
  employeeUpdate = (id: number, data: EmployeeDto, params: RequestParams = {}) =>
    this.http.request<void, EmployeeUpdateError>({
      path: `/Employee/${id}`,
      method: 'PUT',
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags Employee
   * @name EmployeeDelete
   * @summary Deletes an Employee
   * @request DELETE:/Employee/{id}
   * @secure
   */
  employeeDelete = (id: number, params: RequestParams = {}) =>
    this.http.request<void, EmployeeDeleteError>({
      path: `/Employee/${id}`,
      method: 'DELETE',
      secure: true,
      ...params,
    });
}
