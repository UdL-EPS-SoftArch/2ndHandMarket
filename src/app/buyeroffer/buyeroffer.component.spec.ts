  /* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import { BuyerOfferComponent } from './buyeroffer.component';
import { BuyerOfferService } from './buyeroffer.service';

describe('Component: BuyerOffer', () => {

  beforeEach(() =>{
    TestBed.configureTestingModule({
      providers: [BuyerOfferService]
    });
  });

  it('should create an instance', () => {
    inject([BuyerOfferService], (buyerofferService) => {
      let component = new BuyerOfferComponent(buyerofferService);
      expect(component).toBeTruthy();
    });
  });
});
