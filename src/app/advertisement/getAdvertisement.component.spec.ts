/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { AdvertisementService } from './advertisement.service';
import { GetAdvertisementComponent } from './getAdvertisement.component';
import { PurchaseService } from '../purchase/purchase.service';

describe('Component: GetAdvertisement', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ActivatedRoute, Router, AdvertisementService, PurchaseService ]
    });
  });

  it ('should create an instance', () => {
    inject([ ActivatedRoute, Router, AdvertisementService, PurchaseService ],
           (activatedRoute, router, advertisementService, purchaseService) => {
      let component = new GetAdvertisementComponent(
        activatedRoute,
        router,
        advertisementService,
        purchaseService
      );
      expect(component).toBeTruthy();
    });
  });
});
