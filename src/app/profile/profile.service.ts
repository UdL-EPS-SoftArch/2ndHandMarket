import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from '../auth0/user';
import { environment } from '../../environments/environment';
import { Auth0Service } from '../auth0/auth0.service';
import UsersCache from './usersCache';

@Injectable()
export class ProfileService {

  constructor(private http: Http,
              private authentication: Auth0Service) {
  }

  // GET /users/<username>
  getUser(uri: string, useCache = true): Observable<User> {
    if (useCache && uri in UsersCache.entries()) {
      return Observable.of(UsersCache.entries()[uri]);
    }

    return this.http.get(`${environment.API}${uri}`)
      .map((res: Response) => res.json())
      .map((userResult: User) => {
        const user = new User(userResult);
        UsersCache.add(user);
        return new User(user);
      })
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /users/search/findByName?name=<name>
  getUserByName(name: string): Observable<User> {
    return this.http.get(`${environment.API}/users/search/findByName?name=${name}`)
      .map((res: Response) => {
        return new User(res.json()._embedded.users[0]);
      })
      .catch((error: any) => Observable.throw(error.json()));
  }

  // PUT /users/<name>
  putUser(user: User): Observable<User> {
    if (!(user.username || user.name || user.lastname || user.email
          || user.password || user.birthday || user.country)) {
      throw new Error('User basics were not defined.');
    }

    // API will not accept certain fields (like authorities). Let's create
    // a new minimal object.
    const modifiedUser = {
      // username: user.username, Cannot be changed (yet?)
      displayName: user.displayName,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
      birthday: user.birthday,
      country: user.country,
    };

    let body = JSON.stringify(modifiedUser);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    let options = new RequestOptions({ headers: headers });

    return this.http.put(`${environment.API}/users/${user.username}`, body, options)
      .map((res: Response) => {
        const newUser = res.json();
        // API doesn't return username directly. But we assume it'll be the same
        // since it can't be changed.
        newUser.username = user.username;
        return newUser;
      })
      .catch((error: any) => Observable.throw(error.json()));
  }
}
