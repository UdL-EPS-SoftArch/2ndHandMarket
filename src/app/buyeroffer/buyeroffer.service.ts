import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { BuyerOffer } from './buyeroffer';
import { environment } from '../../environments/environment';
import { Auth0Service } from '../auth0/auth0.service';

@Injectable()
export class BuyerOfferService {

  constructor (private http: Http,
               private authentication: Auth0Service) {}

  // GET /BuyerOffers
  getAllBuyerOffers(): Observable<BuyerOffer[]> {
    return this.http.get(`${environment.API}/buyerOffers`)
      .map((res: Response) => res.json()._embedded.buyerOffers)
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /BuyerOffers/:id
  getBuyerOffersByUri(uri: string): Observable<BuyerOffer> {
    return this.http.get(`${environment.API}${uri}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  // POST /BuyerOffers
  addBuyerOffer(buyeroffer: BuyerOffer): Observable<BuyerOffer> {
    let body = JSON.stringify(buyeroffer);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${environment.API}/buyerOffers`, body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  // DELETE /BuyerOffers/:id
  deleteBuyerOfferByUri(uri: string) {
    let headers = new Headers({
      Authorization: this.authentication.getCurrentUser().authorization
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(`${environment.API}${uri}`, options)
      .map((res: Response) => res.ok)
      .catch((error: any) => Observable.throw(error.json()));
  }

  updateOfferById(uri: string, buyerOffer: BuyerOffer): Observable<BuyerOffer> {
    let body = JSON.stringify({'value': buyerOffer.value});
    let headers = new Headers({
      Authorization: this.authentication.getCurrentUser().authorization,
      'Content-Type': 'application/json',
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(`${environment.API}${uri}`, body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

}
