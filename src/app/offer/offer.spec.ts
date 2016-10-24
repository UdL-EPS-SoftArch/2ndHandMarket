/* tslint:disable:no-unused-variable */

import {} from '@angular/core/testing';
import {Offer} from './offer';

describe('Offer', () => {
  it('should create an instance', () => {
    expect(new Offer()).toBeTruthy();
  });
  it('should accept values in the constructor', () => {
    const id = 123;
    const uri = "offer1"
    const date = new Date().getTime();
    const value = 50;


    let offer = new Offer({
      //id: id,
      uri: uri,
      date: date,
      value: value,
    });
    //expect(offer.id).toEqual(id);
    expect(offer.uri).toEqual(uri);
    expect(offer.value).toEqual(value);
    expect(offer.date).toEqual(date);
  });
});
