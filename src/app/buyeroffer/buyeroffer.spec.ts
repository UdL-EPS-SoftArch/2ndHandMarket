/* tslint:disable:no-unused-variable */

import {} from '@angular/core/testing';

import {BuyerOffer} from './buyeroffer';

describe('BuyerOffer', () => {
  it('should create an instance', () => {
    expect(new BuyerOffer()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    const id = 1;
    const adver_id = 1;
    const title = "object";
    const seller = "Joan";
    const initPrice = 50;
    const price = 45;
    const now = new Date().getTime();

    let buyerOffer = new BuyerOffer({
      buyer_id: id,
      advertisement_id: adver_id,
      advertisement_title: title,
      advertisement_seller: seller,
      advertisement_iniPrice: initPrice,
      value: price,
      date: now,
    });
    expect(buyerOffer.buyer_id).toEqual(id);
    expect(buyerOffer.advertisement_id).toEqual(adver_id);
    expect(buyerOffer.advertisement_title).toEqual(title);
    expect(buyerOffer.advertisement_seller).toEqual(seller);
    expect(buyerOffer.advertisement_iniPrice).toEqual(initPrice);
    expect(buyerOffer.value).toEqual(price);
    expect(buyerOffer.date).toEqual(now);
  });
});
