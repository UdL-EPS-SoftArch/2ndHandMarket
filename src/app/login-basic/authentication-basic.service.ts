import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable } from 'rxjs';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationBasicService {

  constructor (private http: Http) {}

  login(username: string, password: string): Observable<User> {
    let authorization: string = 'Basic ' + btoa(username + ':' + password);
    let headers = new Headers({ 'Authorization': authorization });
    let options = new RequestOptions({ headers: headers });

    return this.http.get(`${environment.API}/login`, options)
      .map((res: Response) => {
        let user: User = new User(res.json());
        user.authorization = authorization;
        return user;
      })
      .catch((error: any) => Observable.throw(error.json()));
  }

  storeCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('currentUser') !== null;
  }

  getCurrentUser(): User {
    return new User(JSON.parse(localStorage.getItem('currentUser')));
  }
}
