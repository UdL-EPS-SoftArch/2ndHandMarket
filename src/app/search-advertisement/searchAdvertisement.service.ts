import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';


import { environment } from '../../environments/environment';
import {Advertisement} from "../advertisement/advertisement";

@Injectable()
export class SearchAdvertisementService {

  constructor(private http: Http) {}

  //Search Advertisement
  searchAdvertisementByTitle(title: string): Observable<Advertisement[]> {
    return this.http.get(`${environment.API}/advertisements/search/findByTitleContaining?word=${title}`)
      .map((res: Response) => res.json()._embedded.advertisements)
      .catch((error: any) => Observable.throw(error.json()));
  }

  searchAdvertisementByTag(tag: string): Observable<Advertisement[]> {
    return this.http.get(`${environment.API}/advertisements/search/findByTagsIn?tag=${tag}`)
      .map((res: Response) => res.json()._embedded.advertisements)
      .catch((error: any) => Observable.throw(error.json()));
  }

  searchAdvertisementByCategory(category: string):Observable<Advertisement[]> {
    return this.http.get(`${environment.API}/advertisements/search/findByCategory?category=${category}`)
      .map((res: Response) => res.json()._embedded.advertisements)
      .catch((error: any) => Observable.throw(error.json()));
  }
}
