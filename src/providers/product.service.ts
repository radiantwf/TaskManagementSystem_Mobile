import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Product } from '../model/product';
import { Global } from './global';
/*
  Generated class for the ProductService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ProductService {
  private productsUrl = `${this.global.AppURL}/product`;  // URL to web api
  constructor(private http: Http, private global: Global) { }

  getAllProducts(): Observable<Product[]> {
    let url = `${this.productsUrl}/all`;
    return this.http.get(url, { headers: this.httpHeaders() })
      .map(response => response.json().data as Product[]);
  }

  getProducts(searchCriteria, pageNumber): Observable<Product[]> {
    let url = `${this.productsUrl}/?pagesize=${this.global.PageSize}&page=${pageNumber}`;
    url += (searchCriteria == null ? '' : 'searchCriteria = ' + searchCriteria);
    return this.http.get(url, { headers: this.httpHeaders() })
      .map(response => response.json().data as Product[]);
  }

  getProduct(id: string): Observable<Product> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get(url, { headers: this.httpHeaders() })
      .map(response => response.json().data as Product);
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
