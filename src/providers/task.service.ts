import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Task } from '../model/task';
import { Global } from './global';

/*
  Generated class for the TaskService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class TaskService {
  private tasksUrl = `${this.global.AppURL}/task`;  // URL to web api
  constructor(public http: Http, public global: Global) { }

  getTasks(searchCriteria, searchCriteria2, pageNumber): Observable<Task[]> {
    let url = `${this.tasksUrl}/?pagesize=${this.global.PageSize}&page=${pageNumber}`;
    url += ((searchCriteria == null || searchCriteria === undefined || searchCriteria === '')
      ? '' : '&searchCriteria=' + searchCriteria);
    url += ((searchCriteria2 == null || searchCriteria2 === undefined || searchCriteria2 === '')
      ? '' : '&searchCriteria2=' + searchCriteria2);
    return this.http.get(url, { headers: this.httpHeaders() })
      .map(response => response.json().data as Task[]);
  }

  getTask(id: string): Observable<Task> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.get(url, { headers: this.httpHeaders() })
      .map(response => response.json().data as Task);
  }

  delete(id: string): Observable<void> {
    const url = `${this.tasksUrl}/${id}`;
    return this.http.delete(url, { headers: this.httpHeaders() })
      .map(() => null);
  }

  create(task: Task): Observable<void> {
    return this.http
      .post(this.tasksUrl, JSON.stringify(task), { headers: this.httpHeaders() })
      .map(() => null);
  }

  update(task: Task): Observable<Task> {
    const url = `${this.tasksUrl}/${task.id}/update`;
    return this.http
      .put(url, JSON.stringify(task), { headers: this.httpHeaders() })
      .map(() => task);
  }
  refuse(task: Task): Observable<Task> {
    const url = `${this.tasksUrl}/${task.id}/refuse`;
    return this.http
      .put(url, JSON.stringify(task), { headers: this.httpHeaders() })
      .map(() => null);
  }

  strat(task: Task): Observable<Task> {
    const url = `${this.tasksUrl}/${task.id}/start`;
    return this.http
      .put(url, JSON.stringify(task), { headers: this.httpHeaders() })
      .map(() => task);
  }
  progress(task: Task): Observable<Task> {
    const url = `${this.tasksUrl}/${task.id}/progress`;
    return this.http
      .put(url, JSON.stringify(task), { headers: this.httpHeaders() })
      .map(() => task);
  }
  finish(task: Task): Observable<Task> {
    const url = `${this.tasksUrl}/${task.id}/finish`;
    return this.http
      .put(url, JSON.stringify(task), { headers: this.httpHeaders() })
      .map(() => task);
  }
  close(task: Task): Observable<Task> {
    const url = `${this.tasksUrl}/${task.id}/close`;
    return this.http
      .put(url, JSON.stringify(task), { headers: this.httpHeaders() })
      .map(() => task);
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
