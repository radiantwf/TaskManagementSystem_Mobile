import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { User } from '../model/user';
import { Global } from './global';

/*
  Generated class for the UserService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class UserService {
  private signInUrl = `${this.global.AppURL}/user/signin`;  // URL to web api
  // private userUrl = `${this.global.AppURL}/user`;  // URL to web api

  constructor(public http: Http, private global: Global) {
    console.log('Hello UserService Provider');
  }

  signin(uid: string, password: string): Observable<boolean> {
    return this.http
      .post(this.signInUrl, JSON.stringify({ 'uid': uid, 'password': password })
      , { headers: this.httpHeaders() })
      .map(response => response.json().data as User)
      .map(user => {
        if (user != null) {
          this.global.LocalToken = user.token;
          this.global.CurrentUser = user;
          return true;
        } else {
          this.global.LocalToken = null;
          this.global.CurrentUser = null;
          return false;
        }
      });
  }

  signOut() {
    this.global.LocalToken = null;
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
