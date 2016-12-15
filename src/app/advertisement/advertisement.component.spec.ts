/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';

import { AdvertisementComponent } from './advertisement.component';
import { AdvertisementService } from './advertisement.service';
import { SearchAdvertisementService } from './search-advertisement/searchAdvertisement.service';
import { ActivatedRoute } from '@angular/router';

describe('Component: Advertisement', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdvertisementService]
    });
  });

  it('should create an instance', () => {
    inject([ActivatedRoute ,AdvertisementService, SearchAdvertisementService], (activatedRoute, advertisementService, searchAdvertisementService) => {
      let component = new AdvertisementComponent(activatedRoute, advertisementService, searchAdvertisementService);
      expect(component).toBeTruthy();
    });

  });
});
