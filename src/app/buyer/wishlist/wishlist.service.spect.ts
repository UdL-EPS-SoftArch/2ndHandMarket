import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { BaseRequestOptions, XHRBackend, Http, HttpModule, ResponseOptions, Response
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { WishlistService } from './wishlist.service';
import { Advertisement } from '../../advertisement/advertisement';
import { Auth0Service } from '../../auth0/auth0.service';
import { User } from '../../auth0/user';

describe('Service : Wishlist', () => {
  let advertisement;
  let user;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        WishlistService,
        Auth0Service,
        {
          provide: Http,
          desp: [MockBackend, BaseRequestOptions],
          useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
        }
      ],
      imports: [HttpModule]
    });


    advertisement = new Advertisement({
      uri: 'advertisement/1',
      wishers : [],

    });

    user = new User({
      uri: 'users/user1',

    });


  }));

});
