/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PostAdvertisementComponent } from './postAdvertisement.component';
import { AdvertisementService } from './advertisement.service';

describe('Component: PostAdvertisement', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ AdvertisementService ]
    });
  });

  it ('should create an instance', () => {
    inject([ AdvertisementService ], (advertisementService) => {
      let component = new PostAdvertisementComponent(advertisementService);
      expect(component).toBeTruthy();
    });
  });
});
