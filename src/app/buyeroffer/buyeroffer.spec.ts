/* tslint:disable:no-unused-variable */

import {} from '@angular/core/testing';

import {BuyerOffer} from './buyeroffer';

describe('BuyerOffer', () => {
  it('should create an instance', () => {
    expect(new BuyerOffer()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    /*Inicialization*/
    const id = 1;
    const price = 45;
    const now = new Date().getTime();

    let buyer_offer = new BuyerOffer({
      buyer_offer_id: id,
      value: price,
      date: now,
    });
    expect(buyer_offer.buyer_offer_id).toEqual(id);
    expect(buyer_offer.value).toEqual(price);
    expect(buyer_offer.date).toEqual(now);
  });
});
