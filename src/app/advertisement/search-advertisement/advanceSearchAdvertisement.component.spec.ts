/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';

import { Router } from '@angular/router';
import { AdvanceSearchAdvertisementComponent } from './advanceSearchAdvertisement.component';

describe('Component: Advertisement', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Router]
    });
  });

  it('should create an instance', () => {
    inject([Router ], (router ) => {
      let component = new AdvanceSearchAdvertisementComponent(router);
      expect(component).toBeTruthy();
    });

  });
});
