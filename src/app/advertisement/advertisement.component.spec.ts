/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';

import { AdvertisementComponent } from './advertisement.component';
import { AdvertisementService } from './advertisement.service';
import { SearchAdvertisementService } from './search-advertisement/searchAdvertisement.service';
import { ProfileService } from '../profile/profile.service';
import { ActivatedRoute } from '@angular/router';

describe('Component: Advertisement', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdvertisementService]
    });
  });

  it('should create an instance', () => {
    inject([
        ActivatedRoute,
        AdvertisementService,
        SearchAdvertisementService,
        ProfileService,
      ],
      (
        activatedRoute,
        advertisementService,
        searchAdvertisementService,
        profileService,
      ) => {
      let component = new AdvertisementComponent(activatedRoute, advertisementService, searchAdvertisementService, profileService);
      expect(component).toBeTruthy();
    });

  });
});
