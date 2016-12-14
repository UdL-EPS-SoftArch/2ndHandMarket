/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { ProfileService } from './profile.service';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';

describe('Component: Advertisement', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileComponent]
    });
  });

  it('should create an instance', () => {
    inject([ProfileService, AuthenticationBasicService],
      (advertisementService, authenticationBasicService) => {
      let component = new ProfileComponent(
        advertisementService,
        authenticationBasicService
      );
      expect(component).toBeTruthy();
    });

  });
});
