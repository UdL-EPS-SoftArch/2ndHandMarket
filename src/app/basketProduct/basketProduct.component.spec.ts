/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {BasketProductComponent } from './basketProduct.component';
import {BasketProductService} from './basketProduct.service';
import {AuthenticationBasicService} from '../login-basic/authentication-basic.service';

describe('Component: BasketProduct', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BasketProductService]
    });
  });

  it('should create an instance', () => {
    inject([BasketProductService, AuthenticationBasicService], (basketProductService, authentication) => {
      let component = new BasketProductComponent(basketProductService, authentication);
      expect(component).toBeTruthy();
    });
  });

});
