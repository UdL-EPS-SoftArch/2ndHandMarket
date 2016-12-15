import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Picture} from './picture';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {AuthenticationBasicService} from '../../login-basic/authentication-basic.service';

@Injectable()
export class PictureService {

  constructor (private http: Http,
               private authentication: AuthenticationBasicService) { }

  // GET /pictures
  getAllPictures(): Observable<Picture[]> {
    return this.http.get(`${environment.API}/pictures`)
      .map((res: Response) => res.json()._embedded.pictures)
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /pictures/:id
  getPictureByUri(uri: string): Observable<Picture> {
    return this.http.get(`${environment.API}${uri}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  // POST /pictures
  addPicture(picture: Picture): Observable<Picture> {
    let body = JSON.stringify({ 'filename': picture.filename, 'content': picture.content });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${environment.API}/pictures`, body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  // DELETE /pictures/:id
  deletePictureByUri(uri: string) {
    let headers = new Headers({
      Authorization: this.authentication.getCurrentUser().authorization
    });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(`${environment.API}${uri}`, options)
      .map((res: Response) => res.ok)
      .catch((error: any) => Observable.throw(error.json()));
  }

  // PUT /pictures/:id
  updatePictureById(uri: string, picture: Picture): Observable<Picture> {
    let body = JSON.stringify({
      filename: picture.filename,
      content: picture.content,
      depicts: picture.depicts
    });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    let options = new RequestOptions({ headers: headers });

    return this.http.put(`${environment.API}${uri}`, body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}
