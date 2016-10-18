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
    return this.http.get(`${environment.API}/advertisements`)
      .map((res: Response) => res.json()._embedded.advertisements)
      .catch((error: any) => Observable.throw(error.json()));
  }
}
