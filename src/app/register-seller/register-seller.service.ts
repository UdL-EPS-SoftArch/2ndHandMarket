import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {RegisterSeller} from './register-seller';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable()
export class RegisterSellerService {


  constructor(private http: Http) { }

  // GET /seller
  getAllSellers(): Observable<RegisterSeller[]> {
    return this.http.get(`${environment.API}/register-sellers`)
      .map((res: Response) => res.json()._embedded.sellers)
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /seller/:id
  getSellerByUri(uri: string): Observable<RegisterSeller> {
    return this.http.get(`${environment.API}${uri}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  // POST /seller
  addSeller(seller: RegisterSeller): Observable<RegisterSeller> {
    let body = JSON.stringify({ 'name': seller.name, 'mail': seller.mail, 'password':seller.password });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Basic ' + btoa(environment.user + ':' + environment.password));
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${environment.API}/registerSellers`, body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
  // DELETE /sellers/:id
  deleteSellerByUri(uri: string) {
    let headers = new Headers({ 'Authorization': 'Basic ' + btoa(environment.user + ':' + environment.password) });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(`${environment.API}${uri}`, options)
      .map((res: Response) => res.ok)
      .catch((error: any) => Observable.throw(error.json()));
  }

  }
