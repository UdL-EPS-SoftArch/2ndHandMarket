import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from '../auth0/user';
import { environment } from '../../environments/environment';
import { Auth0Service } from '../auth0/auth0.service';

@Injectable()
export class ProfileService {

  constructor(private http: Http,
              private authentication: Auth0Service) {
  }

  // GET /users/<username>
  getUser(username: string): Observable<User> {
    return this.http.get(`${environment.API}/users/${username}`)
      .map((res: Response) => {
        const user = res.json();
        user.username = username; // API doesn't return username directly.
        return user;
      })
      .catch((error: any) => Observable.throw(error.json()));
  }

  // GET /users/search/findByName?name=<name>
  getUserByName(name: string): Observable<User> {
    return this.http.get(`${environment.API}/users/search/findByName?name=${name}`)
      .map((res: Response) => {
        const user = res.json()._embedded.users[0];
        // We got no username trace, and the API doesn't return it directly.
        // We'll have to gather it through the JSON links.
        // _links: { "user": { "href": "http://localhost:8080/users/user1"} }
        user.username = user._links.href.split().slice(-1)[0];
        return user;
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
