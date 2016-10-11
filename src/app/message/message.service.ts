import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Message} from "./message";
import {Observable} from "rxjs";
import {environment} from '../../environments/environment';

@Injectable()
export class MessageService {

  constructor (private http: Http) {}

  // GET /pictures
  getAllMessages(): Observable<Message[]> {
    return this.http.get(`${environment.API}/messages`)
      .map((res: Response) => res.json().getAllMessages())//?
      .catch((error: any) => Observable.throw(error.json()));
  }

}
