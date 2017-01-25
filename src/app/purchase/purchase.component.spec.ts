/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';

import { PurchaseComponent } from './purchase.component';
import { PurchaseService } from './purchase.service';
import { AdvertisementService } from '../advertisement/advertisement.service';
import { ProfileService } from '../profile/profile.service';

describe('Component: Purchase', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PurchaseService]
    });
  });

  it('should create an instance', () => {
    inject([ActivatedRoute, AdvertisementService, PurchaseService, ProfileService],
      (activatedRouter, advertisementService, purchaseService, profileService) => {
      let component = new PurchaseComponent(
        activatedRouter,
        advertisementService,
        purchaseService,
        profileService,
      );
      expect(component).toBeTruthy();
  });

  });
});
