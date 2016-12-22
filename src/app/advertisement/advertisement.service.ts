import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { Advertisement } from './advertisement';
import { environment } from '../../environments/environment';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';
import { Picture } from './picture/picture';

@Injectable()
export class AdvertisementService {

  constructor (private http: Http,
               private authentication: AuthenticationBasicService) {
    this.getAllAdvertisements = this.getAllAdvertisements.bind(this);
    this.getAdvertisement = this.getAdvertisement.bind(this);
    this.getAdvertisementPictures = this.getAdvertisementPictures.bind(this);
    this.addAdvertisement = this.addAdvertisement.bind(this);
    this.putAdvertisement = this.putAdvertisement.bind(this);
  }

  // GET /advertisements
  getAllAdvertisements(): Observable<Advertisement[]> {
    return this.http.get(`${environment.API}/advertisements?sort=createdAt,desc`)
      .map((res: Response) => {
        const advertisementsApi = res.json()._embedded.advertisements;
        return advertisementsApi
          .map((advertisementInfo) => new Advertisement(advertisementInfo));
      })
      .catch((error: any) => Observable.throw(error.json()));
  }

  getAdvertisement(id: number): Observable<Advertisement> {
    return this.http.get(`${environment.API}/advertisements/${id}`)
      .map((res: Response) => new Advertisement(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /advertisements/:id/pictures
  getAdvertisementPictures(advertisementUri: string): Observable<Picture[]> {
    return this.http.get(`${environment.API}${advertisementUri}/pictures`)
      .map((res: Response) => res.json()._embedded.pictures
        .map(item => new Picture(item))
        .sort((p1, p2) => p2.getUriId() - p1.getUriId()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // POST /advertisements
  addAdvertisement(advertisement: Advertisement): Observable<Advertisement> {
    let body = JSON.stringify(advertisement);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${environment.API}/advertisements`, body, options)
      .map((res: Response) => new Advertisement(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // PUT /advertisements
  putAdvertisement(advertisement: Advertisement): Observable<Advertisement> {
    if (!advertisement.id) {
      throw new Error('Advertisement ID is required.');
    }

    let body = JSON.stringify(advertisement);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    let options = new RequestOptions({ headers: headers });

    return this.http.put(`${environment.API}/advertisements/${advertisement.id}`, body, options)
      .map((res: Response) => new Advertisement(res.json()))
      .catch((error: any) => Observable.throw(error.json()));
  }

  // DELETE /advertisements
  deleteAdvertisement(id: number): Observable<Advertisement> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(`${environment.API}/advertisements/${id}`, options)
      .map((res: Response) => res.ok)
      .catch((error: any) => Observable.throw(error.json()));
  }

  getUriId(advertisement: Advertisement): number {
    return advertisement.uri ? Number(advertisement.uri.split('/')[1]) : null;
  }
}
