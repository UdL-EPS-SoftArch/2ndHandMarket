/* tslint:disable:no-unused-variable */


import { } from '@angular/core/testing';
import {RegisterSeller} from './register-seller';

describe('RegisterSeller', () => {
  it('should create an instance', () => {
    expect(new RegisterSeller()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    let seller = new RegisterSeller({
      name: 'Pepo',
      mail: 'pepo@pepo.com',
      password: 'pepopepo'
    });
    expect(seller.name).toEqual('Pepo');
    expect(seller.mail).toEqual('pepo@pepo.com');
    expect(seller.password).toEqual('pepopepo');

  });
});
