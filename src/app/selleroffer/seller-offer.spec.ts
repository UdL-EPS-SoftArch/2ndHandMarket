/* tslint:disable:no-unused-variable */

import {} from '@angular/core/testing';

import {SellerOffer} from './seller-offer';

describe('SellerOffer', () => {
  it('should create an instance', () => {
    expect(new SellerOffer()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    /*Inicialization*/
    const id = 1;
    const price = 45;
    const now = new Date().getTime();

    let seller_offer = new SellerOffer({
      seller_offer_id: id,
      value: price,
      date: now,
    });
    expect(seller_offer.seller_offer_id).toEqual(id);
    expect(seller_offer.value).toEqual(price);
    expect(seller_offer.date).toEqual(now);
  });
});
