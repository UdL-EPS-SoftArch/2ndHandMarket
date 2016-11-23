import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { User } from '../login-basic/user';
import { environment } from '../../environments/environment';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';

@Injectable()
export class ProfileService {

  constructor(private http: Http,
              private authentication: AuthenticationBasicService) {
  }


  // GET /users/search/findByName?name=<name>
  getUser(name: string): Observable<User> {
    return this.http.get(`${environment.API}/users/search/findByName?name=${name}`)
      .map((res: Response) => res.json()._embedded.users[0])
      .catch((error: any) => Observable.throw(error.json()));
  }

  // PUT /users/<name>
  putUser(user: User): Observable<User> {
    if (!(user.name || user.lastname || user.email || user.birthday ||
        user.country)) {
      throw new Error('Advertisement basics were not defined.');
    }

    // API will not accept certain fields (like authorities). Let's create
    // a new minimal object.
    const newUser = {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      birthday: user.birthday,
      country: user.country,
    };

    let body = JSON.stringify(newUser);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    headers.append('Authorization', this.authentication.getCurrentUser().authorization);
    let options = new RequestOptions({ headers: headers });

    return this.http.put(`${environment.API}/users/${user.name}`, body, options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json()));
  }
}
