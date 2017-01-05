import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Communication } from '../model/communication';
import { Global } from './global';

/*
  Generated class for the CommunicationsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class CommunicationsService {

  private communicationsUrl = `${this.global.AppURL}/communication`;  // URL to web api

  constructor(private http: Http, public global: Global) { }

  getCommunicationsById(id: string): Observable<Communication[]> {
    const url = `${this.communicationsUrl}/${id}`;
    return this.http.get(url, { headers: this.httpHeaders() })
      .map(response => response.json().data as Communication[]);
  }

  create(communication: Communication): Observable<void> {
    return this.http
      .post(this.communicationsUrl, JSON.stringify(communication), { headers: this.httpHeaders() })
      .map(() => null);
  }
  private httpHeaders(): Headers {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let token = this.global.LocalToken;
    if (token != null && token != "") {
      headers.append('X-Auth-Token', token);
    }
    headers.append('Cache-Control', 'no-cache');
    headers.append('Pragma', 'no-cache');
    return headers
  }
}