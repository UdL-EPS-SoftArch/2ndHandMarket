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
      .map((res: Response) => res.json()._embedded.selleroffers)
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /SellerOffers/:id
  getSellerOffersByUri(uri: string): Observable<SellerOffer> {
    return this.http.get(`${environment.API}${uri}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }


  // POST /SellerOffers
  addSellerOffer(selleroffer: SellerOffer): Observable<SellerOffer> {
    let body = JSON.stringify({'seller_offer_id': selleroffer.seller_offer_id, 'value': selleroffer.value, 'date' : selleroffer.date});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Basic ' + btoa(environment.user + ':' + environment.password));
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${environment.API}/selleroffers`, body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  // DELETE /SellerOffers/:id
  deleteSellerOfferByUri(uri: string) {
    let headers = new Headers({ 'Authorization': 'Basic ' + btoa(environment.user + ':' + environment.password) });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(`${environment.API}${uri}`, options)
      .map((res: Response) => res.ok)
      .catch((error: any) => Observable.throw(error.json()));
  }

}
