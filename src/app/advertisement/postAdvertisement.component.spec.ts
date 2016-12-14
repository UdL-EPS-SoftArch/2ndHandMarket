/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Router } from '@angular/router';

import { PostAdvertisementComponent } from './postAdvertisement.component';
import { AdvertisementService } from './advertisement.service';
import { PictureService } from './picture/picture.service';

describe('Component: PostAdvertisement', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ Router, AdvertisementService, PictureService ]
    });
  });

  it ('should create an instance', () => {
    inject([ Router, AdvertisementService, PictureService ],
      (router, advertisementService, pictureService) => {
      let component = new PostAdvertisementComponent(
        router,
        advertisementService,
        pictureService
      );
      expect(component).toBeTruthy();
    });
  });
});
