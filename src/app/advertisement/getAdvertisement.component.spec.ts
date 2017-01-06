/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { AdvertisementService } from './advertisement.service';
import { GetAdvertisementComponent } from './getAdvertisement.component';
import { PurchaseService } from '../purchase/purchase.service';
import { Auth0Service } from '../auth0/auth0.service';
import { BasketProductService } from '../basketProduct/basketProduct.service';

describe('Component: GetAdvertisement', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ ActivatedRoute, Router, AdvertisementService, PurchaseService, BasketProductService ]
    });
  });

  it ('should create an instance', () => {
    inject([ ActivatedRoute, Router, AdvertisementService, PurchaseService, Auth0Service, BasketProductService ],
           (activatedRoute, router, advertisementService, purchaseService, auth0Service, basketProductService) => {
      let component = new GetAdvertisementComponent(
        activatedRoute,
        router,
        advertisementService,
        purchaseService,
        auth0Service,
        basketProductService
      );
      expect(component).toBeTruthy();
    });
  });
});
