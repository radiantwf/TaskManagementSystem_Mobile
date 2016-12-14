import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Employee } from '../model/employee';
import { Global } from './global';
/*
  Generated class for the EmployeeService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class EmployeeService {
  private employeeUrl = `${this.global.AppURL}/employee`;  // URL to web api

  constructor(private http: Http, public global: Global) { }

  getEmployee(): Observable<Array<Employee>> {
    return this.http
      .get(this.employeeUrl
      , { headers: this.httpHeaders() })
      .map(response => response.json().data as Array<Employee>);
  }

  private httpHeaders(): Headers {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let token = this.global.LocalToken;
    if (token != null && token !== '') {
      headers.append('X-Auth-Token', token);
    }
    headers.append('Cache-Control', 'no-cache');
    headers.append('Pragma', 'no-cache');
    return headers;
  }
}
