/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { PutAdvertisementComponent } from './putAdvertisement.component';
import { AdvertisementService } from './advertisement.service';
import { PictureService } from './picture/picture.service';

describe('Component: PutAdvertisement', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ Router, AdvertisementService, PictureService ]
    });
  });

  it ('should create an instance', () => {
    inject([ ActivatedRoute, Router, AdvertisementService, PictureService ],
      (route, router, advertisementService, pictureService) => {
      let component = new PutAdvertisementComponent(
        route,
        router,
        advertisementService,
        pictureService
      );
      expect(component).toBeTruthy();
    });
  });
});
