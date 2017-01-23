/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { BaseRequestOptions, XHRBackend, Http, HttpModule, ResponseOptions, Response
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { ProfileService } from './profile.service';

describe('Service: Profile', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        ProfileService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          deps: [MockBackend, BaseRequestOptions],
          useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
        }
      ],
      imports: [HttpModule]
    });
  }));

  describe('#getUser()', () => {
    it('should use UsersCache when retrieving 2n time',
      async(inject([ MockBackend, ProfileService ], (mockBackend, service) => {
        const uri = '/users/profile.service.spec.it.1';
        let mockBackendCalled = 0;
        mockBackend.connections.subscribe((connection: MockConnection) => {
          mockBackendCalled++;
          const response = new ResponseOptions({ body: { uri } });
          connection.mockRespond(new Response(response));
        });

        service.getUser(uri).subscribe(() => {
          service.getUser(uri).subscribe(() => {
            expect(mockBackendCalled).toBe(1);
          });
        });
    })));

    it('should not use UsersCache if specifically indicated so',
      async(inject([ MockBackend, ProfileService ], (mockBackend, service) => {
        const uri = '/users/profile.service.spec.it.2';
        let mockBackendCalled = 0;
        mockBackend.connections.subscribe((connection: MockConnection) => {
          mockBackendCalled++;
          const response = new ResponseOptions({ body: { uri } });
          connection.mockRespond(new Response(response));
        });

        service.getUser(uri).subscribe(() => {
          service.getUser(uri, false).subscribe(() => {
            expect(mockBackendCalled).toBe(2);
          });
        });
    })));
  });
});
