/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { AdvertisementService } from './advertisement.service';
import { GetAdvertisementComponent } from './getAdvertisement.component';
import { PurchaseService } from '../purchase/purchase.service';
import { Auth0Service } from '../auth0/auth0.service';
import { BasketProductService } from '../basketProduct/basketProduct.service';
import { ProfileService } from '../profile/profile.service';

describe('Component: GetAdvertisement', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ActivatedRoute, Router, AdvertisementService, PurchaseService, BasketProductService ]
    });
  });

  it ('should create an instance', () => {
    inject([ ActivatedRoute, Router, AdvertisementService, PurchaseService, Auth0Service, BasketProductService, ProfileService ],
           (activatedRoute, router, advertisementService, purchaseService, auth0Service, basketProductService, profileService) => {
      let component = new GetAdvertisementComponent(
        activatedRoute,
        router,
        advertisementService,
        purchaseService,
        auth0Service,
        basketProductService,
        profileService,
      );
      expect(component).toBeTruthy();
    });
  });
});
