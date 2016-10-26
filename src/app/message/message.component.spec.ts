/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {MessageComponent } from './message.component';
import {MessageService } from './message.service';
import {AuthenticationBasicService} from '../login-basic/authentication-basic.service';

describe('Component: Message', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService]
    });
  });

  it('should create an instance', () => {
    inject([MessageService, AuthenticationBasicService], (messageService, authentication) => {
      let component = new MessageComponent(messageService, authentication);
      expect(component).toBeTruthy();
    });
  });

});
