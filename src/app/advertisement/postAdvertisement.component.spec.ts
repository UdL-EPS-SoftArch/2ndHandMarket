/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PostAdvertisementComponent } from './postAdvertisement.component';
import { AdvertisementService } from './advertisement.service';
import {Router} from "@angular/router";

describe('Component: PostAdvertisement', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ AdvertisementService ]
    });
  });

  it ('should create an instance', () => {
    inject([Router, AdvertisementService ], (router, advertisementService) => {
      let component = new PostAdvertisementComponent(router, advertisementService);
      expect(component).toBeTruthy();
    });
  });
});
