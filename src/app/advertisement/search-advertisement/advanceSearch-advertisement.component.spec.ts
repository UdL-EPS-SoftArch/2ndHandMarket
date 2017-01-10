/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { SearchAdvertisementService } from './searchAdvertisement.service';
import { AdvanceSearchAdvertisementComponent } from './advanceSearch-advertisement.component';

describe('Component: Advertisement', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchAdvertisementService]
    });
  });

  it('should create an instance', () => {
    inject([ActivatedRoute ], (activatedRoute ) => {
      let component = new AdvanceSearchAdvertisementComponent(activatedRoute);
      expect(component).toBeTruthy();
    });

  });
});
