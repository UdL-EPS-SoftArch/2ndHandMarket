/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import {Router, ActivatedRoute} from '@angular/router';

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
    inject([ ActivatedRoute, Router, AdvertisementService, PictureService ],
      (activatedRoute, router, advertisementService, pictureService) => {
      let component = new PostAdvertisementComponent(
        activatedRoute,
        router,
        advertisementService,
        pictureService
      );
      expect(component).toBeTruthy();
    });
  });
});
