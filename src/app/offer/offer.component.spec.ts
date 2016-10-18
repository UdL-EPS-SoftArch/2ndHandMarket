/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import { OfferComponent } from './offer.component';
import { OfferService } from './offer.service';


describe('Component: Offer', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OfferService]
    })
  });
  it('should create an instance', () => {
    inject([OfferService], (offerService) => {
      let component = new OfferComponent(offerService);
      expect(component).toBeTruthy();
    })

  });
});
