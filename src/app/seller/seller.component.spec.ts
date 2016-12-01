/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';

import { SellerComponent } from './seller.component';

describe('SellerComponent', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ SellerComponent ]
    });
  });

  it('should create an instance', () => {
    inject([], () => {
      let component = new SellerComponent();
      expect(component).toBeTruthy();
    });

  });
});
