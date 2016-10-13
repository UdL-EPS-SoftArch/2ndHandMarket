/* tslint:disable:no-unused-variable */

import { addProviders, async, inject } from '@angular/core/testing';

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

    let advertisement = new Advertisement({
      seller_offer_id: 1,
      value: price,
      date: now,
    });
  }
});
