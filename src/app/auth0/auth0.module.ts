import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AUTH_PROVIDERS } from 'angular2-jwt';
import { Auth0Component } from './auth0.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  providers: [AUTH_PROVIDERS],
  declarations: [Auth0Component],
  exports: [Auth0Component]
})
export class Auth0Module { }
