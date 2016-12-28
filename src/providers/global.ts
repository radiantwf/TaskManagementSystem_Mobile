import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { User } from '../model/user';

/*
  Generated class for the Gobal provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Global {
  private static _appURL = 'http://127.0.0.1:8888/v1';
  private static _token = '';
  private static _currentUser: User = null;
  private static _pageSize: Number = 10;

  constructor(public http: Http) {
  }
  public get AppURL(): string {
    return Global._appURL;
  }
  public get LocalToken(): string {
    return Global._token;
  }
  public set LocalToken(token: string) {
    Global._token = token;
  }
  public get CurrentUser(): User {
    return Global._currentUser;
  }
  public get PageSize(): Number {
    return Global._pageSize;
  }
  public set CurrentUser(currentUser: User) {
    Global._currentUser = currentUser;
  }


}
