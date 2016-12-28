import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Project } from '../model/project';
import { Global } from './global';
/*
  Generated class for the ProjectService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProjectService {
  private projectsUrl = `${this.global.AppURL}/project`;  // URL to web api
  constructor(private http: Http, private global: Global) { }

  getAllProjects(): Observable<Project[]> {
    let url = `${this.projectsUrl}/all`;
    return this.http.get(url, { headers: this.httpHeaders() })
      .map(response => response.json().data as Project[]);
  }
  getProjects(searchCriteria, pageNumber): Observable<Project[]> {
    let url = `${this.projectsUrl}/?pagesize=${this.global.PageSize}&page=${pageNumber}`;
    url += (searchCriteria == null ? '' : 'searchCriteria = ' + searchCriteria);
    return this.http.get(url, { headers: this.httpHeaders() })
      .map(response => response.json().data as Project[]);
  }

  getProject(id: string): Observable<Project> {
    const url = `${this.projectsUrl}/${id}`;
    return this.http.get(url, { headers: this.httpHeaders() })
      .map(response => response.json().data as Project);
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
