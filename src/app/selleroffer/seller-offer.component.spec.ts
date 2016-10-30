  /* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import { SellerOfferComponent } from './seller-offer.component';
import { SellerOfferService } from './seller-offer.service';

describe('Component: SellerOffer', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SellerOfferService]
    });
  });

  it('should create an instance', () => {
    inject([SellerOfferService], (sellerofferService) => {
      let component = new SellerOfferComponent(sellerofferService);
      expect(component).toBeTruthy();
    });
  });
});
