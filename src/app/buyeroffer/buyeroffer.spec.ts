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
    const adver_id = 1;
    const title = "object";
    const seller = "Joan";
    const initPrice = 50;
    const price = 45;
    const now = new Date().getTime();

    let buyer_offer = new BuyerOffer({
      buyer_id: id,
      advertisement_id: adver_id,
      advertisement_title: title,
      advertisement_seller: seller,
      advertisement_iniPrice: initPrice,
      value: price,
      date: now,
    });
    expect(buyer_offer.buyer_id).toEqual(id);
    expect(buyer_offer.advertisement_id).toEqual(adver_id);
    expect(buyer_offer.advertisement_title).toEqual(title);
    expect(buyer_offer.advertisement_seller).toEqual(seller);
    expect(buyer_offer.advertisement_iniPrice).toEqual(initPrice);
    expect(buyer_offer.value).toEqual(price);
    expect(buyer_offer.date).toEqual(now);
  });
});
