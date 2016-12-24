/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import {Router, ActivatedRoute} from '@angular/router';

import { PurchaseComponent } from './purchase.component';
import { PurchaseService } from './purchase.service';
import {AdvertisementService} from '../advertisement/advertisement.service';

describe('Component: Purchase', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PurchaseService]
    });
  });

  it('should create an instance', () => {
    inject([ActivatedRoute, AdvertisementService, PurchaseService],
      (activatedRouter, advertisementService, purchaseService) => {
      let component = new PurchaseComponent(
        activatedRouter,
        advertisementService,
        purchaseService
      );
      expect(component).toBeTruthy();
  });

  });
});
