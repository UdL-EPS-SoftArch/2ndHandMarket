/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { AdvertisementService } from './advertisement.service';
import { GetAdvertisementComponent } from './getAdvertisement.component';

describe('Component: GetAdvertisement', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ActivatedRoute, Router, AdvertisementService ]
    });
  });

  it ('should create an instance', () => {
    inject([ ActivatedRoute, Router, AdvertisementService ], (activatedRoute, router, advertisementService) => {
      let component = new GetAdvertisementComponent(activatedRoute, router, advertisementService);
      expect(component).toBeTruthy();
    });
  });
});
