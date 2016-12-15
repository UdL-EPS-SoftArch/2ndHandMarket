import { Injectable } from '@angular/core';
import { Offer } from './buyerOffer';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';

@Injectable()
export class OfferService {

  lastId: number = 0;
  offers: Offer[] = [];

  constructor(private http: Http,
              private authentication: AuthenticationBasicService) { }

  addOffer(offer: Offer): Observable<Offer> {
    let body = JSON.stringify(offer);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${environment.API}/buyerCounterOffers`, body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  deleteOfferByUri(uri: string) {
    let headers = new Headers({
      Authorization: this.authentication.getCurrentUser().authorization
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(`${environment.API}${uri}`, options)
      .map((res: Response) => res.ok)
      .catch((error: any) => Observable.throw(error.json()));
  }

  /*updateOfferById(id: number, values: Object = {}): Offer {
    let offer = this.getOfferById(id);
    if (!offer) {
      return null;
    }
    Object.assign(offer, values);
    return offer;
  }*/

  getAllOffers(): Observable<Offer[]> {
    return this.http.get(`${environment.API}/buyerCounterOffers`)
      .map((res: Response) => res.json()._embedded.buyerCounterOffers)
      .catch((error: any) => Observable.throw(error.json()));
  }

  /*getOfferById(id: number): Offer {
    return this.offers
      .filter(offer => offer.id === id)
      .pop();
  }*/

  updateOfferById(uri: string, offer: Offer): Observable<Offer> {
    let body = JSON.stringify({'value': offer.value});
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
