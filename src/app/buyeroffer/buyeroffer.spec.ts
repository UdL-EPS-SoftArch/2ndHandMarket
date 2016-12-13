/* tslint:disable:no-unused-variable */

import {} from '@angular/core/testing';

import {BuyerOffer} from './buyeroffer';

describe('BuyerOffer', () => {
  it('should create an instance', () => {
    expect(new BuyerOffer()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    const id = 1;
    const price = 45;
    const now = new Date().getTime();

    let buyerOffer = new BuyerOffer({
      buyer_offer_id: id,
      value: price,
      date: now,
    });
    expect(buyerOffer.buyer_offer_id).toEqual(id);
    expect(buyerOffer.value).toEqual(price);
    expect(buyerOffer.date).toEqual(now);
  });
});
