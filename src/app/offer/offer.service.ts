import { Injectable } from '@angular/core';
import {Offer} from './offer';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable()
export class OfferService {

  lastId: number = 0;
  offers: Offer[] = [];


  constructor( private http: Http ) { }

  addOffer(offer: Offer): Observable<Offer> {
    let body = JSON.stringify(offer);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Basic ' + btoa(environment.user + ':' + environment.password));
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${environment.API}/offers`, body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  deleteOfferById(id: number): OfferService {
    this.offers = this.offers
      .filter(offer => offer.id !== id);
    return this;
  }

  updateOfferById(id: number, values: Object = {}): Offer {
    let offer = this.getOfferById(id);
    if (!offer) {
      return null;
    }
    Object.assign(offer, values);
    return offer;
  }

  getAllOffers(): Observable<Offer[]> {
    return this.http.get(`${environment.API}/offers`)
      .map((res: Response) => res.json()._embedded.offer)
      .catch((error: any) => Observable.throw(error.json()));
  }

  getOfferById(id: number): Offer {
    return this.offers
      .filter(offer => offer.id === id)
      .pop();
  }

}
