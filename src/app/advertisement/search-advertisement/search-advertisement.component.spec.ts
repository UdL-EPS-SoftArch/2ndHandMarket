/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { SearchAdvertisementService } from './searchAdvertisement.service';
import { SearchAdvertisementComponent } from './search-advertisement.component';

describe('Component: Advertisement', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchAdvertisementService]
    });
  });

  it('should create an instance', () => {
    inject([ActivatedRoute ], (activatedRoute,) => {
      let component = new SearchAdvertisementComponent(activatedRoute);
      expect(component).toBeTruthy();
    });

  });
});
