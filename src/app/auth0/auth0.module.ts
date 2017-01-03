import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Auth0Component } from './auth0.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  providers: [],
  declarations: [Auth0Component],
  exports: [Auth0Component]
})
export class Auth0Module { }
