/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {MessageComponent } from './message.component';
import {MessageService } from './message.service';

describe('Component: Message', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService]
    });
  });

  it('should create an instance', () => {
    inject([MessageService], (messageService) => {
      let component = new MessageComponent(messageService);
      expect(component).toBeTruthy();
    });
  });

});
