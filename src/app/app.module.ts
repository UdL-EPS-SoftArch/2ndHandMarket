import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {APP_BASE_HREF} from '@angular/common';

import { AppComponent } from './app.component';
import { PictureComponent } from './picture/picture.component';
import { routing, appRoutingProviders }  from './app.routing';
import { NavbarComponent } from './navbar/navbar.component';
import { IntroComponent } from './intro/intro.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { PostAdvertisementComponent } from './advertisement/postAdvertisement.component';
import { FooterComponent } from './footer/footer.component';
import { SearchAdvertisementComponent } from './search-advertisement/search-advertisement.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  declarations: [
    AppComponent,
    PictureComponent,
    NavbarComponent,
    IntroComponent,
    AdvertisementComponent,
    PostAdvertisementComponent,
    IntroComponent,
    FooterComponent,
    SearchAdvertisementComponent
  ],
  providers: [
    appRoutingProviders,
    { provide: APP_BASE_HREF, useValue : '/' }
  ],
  bootstrap: [AppComponent, NavbarComponent, FooterComponent]
})
export class AppModule { }
