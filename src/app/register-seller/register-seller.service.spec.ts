/* tslint:disable:no-unused-variable */
import { TestBed, inject, async} from '@angular/core/testing';
import { RegisterSellerService} from './register-seller.service';
import { HttpModule, BaseRequestOptions, Http, XHRBackend} from '@angular/http';
import { MockBackend} from '@angular/http/testing';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';

beforeEach(async(() => {
  TestBed.configureTestingModule({
    providers: [
      RegisterSellerService,
      AuthenticationBasicService,
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
