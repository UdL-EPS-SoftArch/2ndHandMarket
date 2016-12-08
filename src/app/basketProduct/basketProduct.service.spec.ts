import { TestBed, async, inject } from '@angular/core/testing';
import { BasketProductService } from './basketProduct.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, XHRBackend, Http, HttpModule, ResponseOptions, Response } from '@angular/http';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';



describe('Service: BasketProduct', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        BasketProductService
      ]
    });
  }));

  it('should ...', inject([BasketProductService], (service: BasketProductService) => {
    expect(service).toBeTruthy();
  }));
});
