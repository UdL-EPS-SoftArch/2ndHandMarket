import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Message} from "./message";
import {Observable} from "rxjs";
import {environment} from '../../environments/environment';

@Injectable()
export class MessageService {

  constructor (private http: Http) {}

  // GET /privateMessages
  getAllMessages(): Observable<Message[]> {
    return this.http.get(`${environment.API}/privateMessages`)
      .map((res: Response) => res.json()._embedded.messages)
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /privateMessages/:id
  getMessageByUri(uri: string): Observable<Message> {
    return this.http.get(`${environment.API}${uri}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  // POST /privateMessages
  addMessage(message: Message): Observable<Message> {
    let body = JSON.stringify({ 'title': message.title, 'body': message.body, 'destination' : message.destination});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', 'Basic ' + btoa(environment.user + ':' + environment.password));
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${environment.API}/privateMessages`, body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }

  // DELETE /privateMessages/:id
  deleteMessageByUri(uri: string) {
    let headers = new Headers({ 'Authorization': 'Basic ' + btoa(environment.user + ':' + environment.password) });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(`${environment.API}${uri}`, options)
      .map((res: Response) => res.ok)
      .catch((error: any) => Observable.throw(error.json()));
  }

}
