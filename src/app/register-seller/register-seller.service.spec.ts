/* tslint:disable:no-unused-variable */
import {TestBed, inject} from '@angular/core/testing';

import {RegisterSellerService} from "./register-seller.service";


describe('Service: RegisterSeller', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisterSellerService]
    });
  });

  it('should ...', inject([RegisterSellerService], (service: RegisterSellerService) => {
    expect(service).toBeTruthy();
  }));
});
