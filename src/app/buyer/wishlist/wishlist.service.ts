import { Response, Http, Headers, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs';
import { Injectable} from '@angular/core';

import { Auth0Service } from '../../auth0/auth0.service';
import { environment } from '../../../environments/environment';
import { User } from '../../auth0/user';
import { Advertisement } from '../../advertisement/advertisement';

@Injectable()
export class WishlistService {

  constructor(private http: Http,
              private authentication: Auth0Service) {

  }

  getWishersByAdvertisement(advertisementUri: string): Observable<Advertisement> {
    return this.http.get(`${environment.API}${advertisementUri}/wishers`)
      .map((res: Response) => res.json());
  }

  addProduct(advertisement: Advertisement): Observable<Advertisement> {
    let body = JSON.stringify(advertisement);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${environment.API}/wishes`, body, options)
      .map((res: Response) => new User(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }
}
