import {Response, Http, Headers, RequestOptions} from '@angular/http';
import { Observable} from 'rxjs';
import { Injectable} from '@angular/core';

import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';
import { environment } from '../../environments/environment';
import { Purchase } from './purchase';
import { Advertisement } from '../advertisement/advertisement';

@Injectable()
export class PurchaseService {

  constructor(private http: Http,
              private authentication: AuthenticationBasicService) {
  }

  // GET /purchases/:id
  getPurchase(id: number): Observable<any> {
    return new Observable(observer => {
      Observable.forkJoin(
        this.http.get(`${environment.API}/purchases/${id}`).map((res: Response) => res.json()),
        this.http.get(`${environment.API}/purchases/${id}/advertisement`).map((res: Response) => res.json()),
      ).subscribe(
        data => {
          const purchase = data[0];
          purchase.advertisement = data[1];
          observer.complete(purchase);
        },
        error => observer.error(error.json()),
      );
    });
  }

  // GET /purchases/:id
  getPurchaseByAdvertisement(advertisement: Advertisement): Observable<Purchase> {
    if (!advertisement.id) throw new Error('Advertisement ID is required');

    return this.http.get(`${environment.API}/purchases/${advertisement.id}`)
      .map((res: Response) => res.json())
      .map((purchase: Purchase) => {
        purchase.advertisement = advertisement;
        return purchase;
      })
      .catch((error: any) => Observable.throw(error.json()));
  }

  // POST /purchases
  addPurchase(purchase: Purchase): Observable<Purchase> {
    if (!(purchase.advertisement && purchase.advertisement.uri)) {
      throw new Error('Advertisement URI is required');
    }

    // API expects advertisement to be an only URI string.
    // We're storing the advertisement as an object.
    // Moreover, the API doesn't expect any other field but this one. So let's
    // just build another object which contains this field.
    const newPurchase = {
      advertisement: purchase.advertisement.uri,
    };
    const body = JSON.stringify(newPurchase);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${environment.API}/purchases`, body, options)
      .map((res: Response) => res.json())
      .map((purchaseResult: Purchase) => {
        purchaseResult.advertisement = purchase.advertisement;
        return purchaseResult;
      })
      .catch((error: any) => Observable.throw(error.json()));
  }

  // Note: There is no PUT nor DELETE because the API does not allow to do so.
}
