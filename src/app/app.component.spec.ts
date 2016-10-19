/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {appRoutingProviders, routing} from "./app.routing";
import {APP_BASE_HREF} from "@angular/common";
import {PictureComponent} from "./picture/picture.component";
import {IntroComponent} from "./intro/intro.component";
import {AdvertisementComponent} from "./advertisement/advertisement.component";
import {FooterComponent} from "./footer/footer.component";
import {OfferComponent} from "./offer/offer.component";

describe('App: Softarch1617Client', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, PictureComponent, IntroComponent, FooterComponent, AdvertisementComponent, OfferComponent
      ],
      imports: [
        routing
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

