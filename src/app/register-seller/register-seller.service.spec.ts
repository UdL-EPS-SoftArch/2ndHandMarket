/* tslint:disable:no-unused-variable */
import { TestBed, inject, async} from '@angular/core/testing';
import { RegisterSellerService} from './register-seller.service';
import { HttpModule, BaseRequestOptions, Http, XHRBackend} from '@angular/http';
import { MockBackend} from '@angular/http/testing';
import { Auth0Service } from '../auth0/auth0.service';

beforeEach(async(() => {
  TestBed.configureTestingModule({
    providers: [
      Http,
      RegisterSellerService,
      Auth0Service,
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

describe('Service: RegisterSeller', () => {

  it('should ...', inject([RegisterSellerService], (service: RegisterSellerService) => {
    expect(service).toBeTruthy();
  }));

});
