import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { Advertisement } from './advertisement';
import { environment } from '../../environments/environment';

@Injectable()
export class AdvertisementService {

  constructor (private http: Http) {}

  // GET /advertisements
  getAllAdvertisements(): Observable<Advertisement[]> {
    return this.http.get(`${environment.API}/advertisements?sort=createdAt,desc`)
      .map((res: Response) => res.json()._embedded.advertisements)
      .catch((error: any) => Observable.throw(error.json()));
  }

  getAdvertisement(id: number): Observable<Advertisement> {
    return this.http.get(`${environment.API}/advertisements/${id}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  // POST /advertisements
  addAdvertisement(advertisement: Advertisement): Observable<Advertisement> {
    let body = JSON.stringify(advertisement);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Basic ' + btoa(environment.user + ':' + environment.password));
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${environment.API}/advertisements`, body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  // DELETE /advertisements
  deleteAdvertisement(id: number): Observable<Advertisement> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Basic ' + btoa(environment.user + ':' + environment.password));
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(`${environment.API}/advertisements/${id}`, options)
      .map((res: Response) => res.ok)
      .catch((error: any) => Observable.throw(error.json()));
  }
}
