/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';

import { SearchAdvertisementComponent } from './search-advertisement.component';
import { SearchAdvertisementService } from './searchAdvertisement.service';

describe('Component: SearchAdvertisement', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ SearchAdvertisementService]
    });
  });

  it('should create an instance', () => {
    inject([SearchAdvertisementService], (searchAdvertisementService) => {
      let component = new SearchAdvertisementComponent(searchAdvertisementService);
      expect(component).toBeTruthy();
    });
  });
});
