import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { SellerOffer } from './seller-offer';
import { environment } from '../../environments/environment';

@Injectable()
export class SellerOfferService {

  constructor (private http: Http) {}

  // GET /SellerOffers
  getAllSellerOffers(): Observable<SellerOffer[]> {
    return this.http.get(`${environment.API}/selleroffers`)
      .map((res: Response) => res.json()._embedded.advertisements)
      .catch((error: any) => Observable.throw(error.json()));
  }
}
