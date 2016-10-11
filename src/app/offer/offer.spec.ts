/* tslint:disable:no-unused-variable */

import {} from '@angular/core/testing';
import {Offer} from './offer';

describe('Offer', () => {
  it('should create an instance', () => {
    expect(new Offer()).toBeTruthy();
  });
  it('should accept values in the constructor', () => {
    let offer = new Offer({
      filename: 'offer1',
      value: 50
    });
    expect(offer.filename).toEqual('offer1');
    expect(offer.value).toEqual(50);
  });
});
