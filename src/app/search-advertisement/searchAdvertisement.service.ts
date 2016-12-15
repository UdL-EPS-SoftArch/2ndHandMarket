import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';


import { environment } from '../../environments/environment';
import {Advertisement} from '../advertisement/advertisement';

@Injectable()
export class SearchAdvertisementService {

  constructor(private http: Http) {}

  // Search Advertisement
  searchAdvertisementByTitle(title: string): Observable<Advertisement[]> {
    const titleUrl = `${environment.API}/advertisements/search/findByTitleContaining?word=${title}`;
    return this.http.get(titleUrl)
      .map((res: Response) => res.json()._embedded.advertisements)
      .catch((error: any) => Observable.throw(error.json()));
  }

  searchAdvertisementByTag(tag: string): Observable<Advertisement[]> {
    const tagUrl = `${environment.API}/advertisements/search/findByTagsIn?tag=${tag}`;
    return this.http.get(tagUrl)
      .map((res: Response) => res.json()._embedded.advertisements)
      .catch((error: any) => Observable.throw(error.json()));
  }

  searchAdvertisementByCategory(category: string): Observable<Advertisement[]> {
    const categoryUrl = `${environment.API}/advertisements/search/findByCategory
      ?category=${category}`;
    return this.http.get(categoryUrl)
      .map((res: Response) => res.json()._embedded.advertisements)
      .catch((error: any) => Observable.throw(error.json()));
  }
}
