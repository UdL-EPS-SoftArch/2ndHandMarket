import { Response, Http, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs';
import { Injectable} from '@angular/core';

import { Auth0Service } from '../auth0/auth0.service';
import { environment } from '../../environments/environment';
import { Purchase } from './purchase';

@Injectable()
export class PurchaseService {

  constructor(private http: Http,
              private authentication: Auth0Service) {
  }

  // GET /purchases/:id
  getPurchase(uri: string): Observable<Purchase> {
    return Observable.forkJoin(
        this.http.get(`${environment.API}${uri}`)
          .map((res: Response) => res.json()),
        this.http.get(`${environment.API}${uri}/advertisements`)
          .map((res: Response) => res.json()._embedded.advertisements),
      )
      .map((data) => {
        const purchase = new Purchase(data[0]);
        purchase.advertisements = data[1];
        return purchase;
      })
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /purchases/:id
  getPurchaseByAdvertisement(advertisementUri: string): Observable<Purchase> {
    return this.http.get(`${environment.API}${advertisementUri}/purchase`)
      .map((res: Response) => res.json())
      .map((purchase: Purchase) => {
        return purchase.uri;
      })
      .flatMap((purchaseUri) => this.getPurchase(purchaseUri))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // POST /purchases
  addPurchase(purchase: Purchase): Observable<Purchase> {
    if (!purchase.advertisements || purchase.advertisements.filter((e) => !e.uri).length > 0) {
      throw new Error('Advertisement(s) URI is required');
    }

    // API expects advertisement to be an array of only URI strings.
    // We're storing the advertisement as an object.
    // Moreover, the API doesn't expect any other field but this one. So let's
    // just build another object which contains this field.
    const newPurchase = {
      advertisements: purchase.advertisements.map((advertisement) => advertisement.uri),
    };
    const body = JSON.stringify(newPurchase);

    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${environment.API}/purchases`, body, options)
      .map((res: Response) => res.json())
      .map((purchaseResult: Purchase) => {
        purchaseResult.advertisements = purchase.advertisements;
        return new Purchase(purchaseResult);
      })
      .catch((error: any) => Observable.throw(error.json()));
  }

  // Note: There is no PUT nor DELETE because the API does not allow to do so.
}
