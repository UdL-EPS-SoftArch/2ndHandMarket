/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PurchaseService } from '../purchase/purchase.service';
import { AdvertisementService } from '../advertisement/advertisement.service';
import { BuyerOfferService } from './buyeroffer.service';
import { Auth0Service } from '../auth0/auth0.service';
import { ManageOffersComponent } from './manageOffers.component';

describe('Component: ManageOffers', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BuyerOfferService, PurchaseService, Auth0Service, AdvertisementService]
    });
  });

  it('should create an instance', () => {
    inject([BuyerOfferService, PurchaseService, Auth0Service, AdvertisementService],
      (buyerOfferService, purchaseService, authenticationBasicService, advertisementService) => {
      let component = new ManageOffersComponent(
        buyerOfferService,
        purchaseService,
        authenticationBasicService,
        advertisementService
      );
      expect(component).toBeTruthy();
    });
  });
});
