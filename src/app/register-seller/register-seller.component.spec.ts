/* tslint:disable:no-unused-variable */

import { TestBed } from '@angular/core/testing';
import { RegisterSellerComponent} from './register-seller.component';
import {RegisterSellerService} from "./register-seller.service";


beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [RegisterSellerService]
  });
});

describe('Component: RegisterSeller', () => {
  it('should create an instance', () => {
    let component = new RegisterSellerComponent();
    expect(component).toBeTruthy();
  });
});
