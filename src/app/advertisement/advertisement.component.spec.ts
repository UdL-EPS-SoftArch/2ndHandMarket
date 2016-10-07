/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import { AdvertisementComponent } from './advertisement.component';
import { AdvertisementService } from './advertisement.service';

describe('Component: Advertisement', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdvertisementService]
    })
  });
  it('should create an instance', () => {
    inject([AdvertisementService], (advertisementService) => {
      let component = new AdvertisementComponent(advertisementService);
      expect(component).toBeTruthy();
    })

  });
});
