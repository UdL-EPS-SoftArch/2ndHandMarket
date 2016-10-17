/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { appRoutingProviders, routing } from './app.routing';
import { APP_BASE_HREF } from '@angular/common';
import { PictureComponent } from './picture/picture.component';
import { IntroComponent } from './intro/intro.component';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { FooterComponent } from './footer/footer.component';
import { PostAdvertisementComponent } from './advertisement/postAdvertisement.component';
import { FormsModule } from '@angular/forms';
import { SearchAdvertisementComponent } from './search-advertisement/search-advertisement.component';
import { GetAdvertisementComponent } from './advertisement/getAdvertisement.component';
import { MomentModule } from 'angular2-moment';
import {ContactComponent} from './contact/contact.component';

describe('App: Softarch1617Client', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, PictureComponent, IntroComponent, FooterComponent, AdvertisementComponent, SearchAdvertisementComponent,
        PostAdvertisementComponent, GetAdvertisementComponent, ContactComponent
      ],
      imports: [
        routing, FormsModule, MomentModule
      ],
      providers: [
        appRoutingProviders,
        { provide: APP_BASE_HREF, useValue : '/' }
      ]
    });
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(AppComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});

