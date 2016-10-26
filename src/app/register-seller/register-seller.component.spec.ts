/* tslint:disable:no-unused-variable */

import {TestBed, inject} from '@angular/core/testing';
import { RegisterSellerComponent} from './register-seller.component';
import {RegisterSellerService} from "./register-seller.service";


beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [RegisterSellerService]
  });
});

describe('Component: RegisterSeller', () => {
  inject([RegisterSellerService], (sellerService) => {
    let component = new RegisterSellerComponent(sellerService);
    expect(component).toBeTruthy();
  });
});
