import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { User } from './user';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

// Avoid name not found warnings
let Auth0Lock = require('auth0-lock').default;

@Injectable()
export class Auth0Service {
  // Configure Auth0
  lock = new Auth0Lock('DJ560FbKB04XCcouTfpzVChcNJhHxw3P', 'softarch-1617.eu.auth0.com', {});
  errorMessage = '';

  constructor(private http: Http) {
    // Add callback for the Lock `authenticated` event
    this.lock.on('authenticated', (authResult) => {
      localStorage.setItem('id_token', authResult.idToken);
      this.fetchCurrentUser(authResult.accessToken)
        .subscribe(
          user => this.storeCurrentUser(user),
          error =>  this.errorMessage = <any>error.message);
    });
  }

  private fetchCurrentUser(access_token: string): Observable<User> {
    const authorization = this.generateAuthorization(access_token);
    const headers = new Headers({'Authorization': authorization});
    const options = new RequestOptions({headers: headers});

    return this.http.get(`${environment.API}/user`, options)
      .map((res: Response) => {
        let user: User = new User(res.json());
        user.authorization = authorization;
        return user;
      })
      .catch((error: any) => Observable.throw(error.json()));
  }

  public login() {
    // Call the show method to display the widget.
    this.lock.show();
  }

  generateAuthorization(access_token: string): string {
    return `Bearer ${access_token}`;
  }

  storeCurrentUser(user: User): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  public logout(): void {
    localStorage.removeItem('id_token');
    localStorage.removeItem('currentUser');
  }

  public isLoggedIn(): boolean {
    // Check if there's an unexpired JWT
    // This searches for an item in localStorage with key == 'id_token'
    return tokenNotExpired();
  }

  public getCurrentUser(): User {
    return new User(JSON.parse(localStorage.getItem('currentUser')));
  }
}
