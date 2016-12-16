import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';


import { environment } from '../../../environments/environment';
import { Advertisement } from '../advertisement';

@Injectable()
export class SearchAdvertisementService {

  constructor(private http: Http) {
    this.searchAdvertisementByTitle = this.searchAdvertisementByTitle.bind(this);
    this.searchAdvertisementByTag = this.searchAdvertisementByTag.bind(this);
    this.searchAdvertisementByCategory = this.searchAdvertisementByCategory.bind(this);
  }

  // Search Advertisement
  searchAdvertisementByTitle(title: string): Observable<Advertisement[]> {
    return this.http.get(`${environment.API}/advertisements/search/findByTitleContaining?word=${title}&sort=createdAt,desc`)
      .map((res: Response) => res.json()._embedded.advertisements)
      .catch((error: any) => Observable.throw(error.json()));
  }

  searchAdvertisementByTag(tag: string): Observable<Advertisement[]> {
    return this.http.get(`${environment.API}/advertisements/search/findByTagsIn?tag=${tag}&sort=createdAt,desc`)
      .map((res: Response) => res.json()._embedded.advertisements)
      .catch((error: any) => Observable.throw(error.json()));
  }

  searchAdvertisementByCategory(category: string): Observable<Advertisement[]> {
    return this.http.get(`${environment.API}/advertisements/search/findByCategory?category=${category}&sort=createdAt,desc`)
      .map((res: Response) => res.json()._embedded.advertisements)
      .catch((error: any) => Observable.throw(error.json()));
  }
}
