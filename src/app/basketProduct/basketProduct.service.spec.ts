import { TestBed, async, inject } from '@angular/core/testing';
import { BasketProductService } from './basketProduct.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, XHRBackend, Http, HttpModule, ResponseOptions, Response } from '@angular/http';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';

class ResponseError extends Error {
  json() {
    return '{ \'message\': \'Error\' }';
  }
}

describe('Service: BasketProduct', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        BasketProductService,
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

  describe('#getAllProducts()', () => {

    it('should return all messages',
      async(inject([ MockBackend, BasketProductService ], (mockBackend, service) => {
        mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            connection.mockRespond(new Response(
              new ResponseOptions({
                body: { '_embedded': { 'products':
                  [ { title: 'TitleTest1' }, { title: 'TitleTest2' } ] } }

              })
            ));
            connection.mockError(new ResponseError());
          });

        service.getAllProducts().subscribe((data) => {
          expect(data.length).toBe(2);
          expect(data[0].product.title).toBe('TitleTest1');
          expect(data[1].product.title).toBe('TitleTest2');
        });
      })));
  });

  it('should ...', inject([BasketProductService], (service: BasketProductService) => {
    expect(service).toBeTruthy();
  }));
});
