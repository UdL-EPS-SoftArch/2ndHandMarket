/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {MessageComponent } from './message.component';
import {MessageService } from './message.service';
import {Auth0Service} from '../auth0/auth0.service';

describe('Component: Message', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService]
    });
  });

  it('should create an instance', () => {
    inject([MessageService, Auth0Service], (messageService, authentication) => {
      let component = new MessageComponent(messageService, authentication);
      expect(component).toBeTruthy();
    });
  });

});
