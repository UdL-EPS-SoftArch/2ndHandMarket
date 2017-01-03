/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { Auth0Service } from '../auth0/auth0.service';

describe('Component: Advertisement', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileComponent]
    });
  });

  it('should create an instance', () => {
    inject([ProfileService, Auth0Service],
      (advertisementService, Auth0Service) => {
      let component = new ProfileComponent(
        advertisementService,
        Auth0Service
      );
      expect(component).toBeTruthy();
    });

  });
});
