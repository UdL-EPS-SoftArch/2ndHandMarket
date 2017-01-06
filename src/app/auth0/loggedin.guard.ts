import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Auth0Service } from './auth0.service';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor(private auth0Service: Auth0Service) {}

  canActivate(): boolean {
    if (this.auth0Service.isLoggedIn()) {
      return true;
    } else {
      this.auth0Service.login();
      return false;
    }
  }
}
