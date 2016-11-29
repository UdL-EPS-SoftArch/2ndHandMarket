/* tslint:disable:no-unused-variable */

import {
  HttpModule, Http, BaseRequestOptions, XHRBackend,
  ResponseOptions, Response
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';

import { Advertisement } from '../advertisement/advertisement';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';
import { Purchase } from './purchase';
import { PurchaseService } from './purchase.service';

describe('Service: Purchase', () => {
  let advertisement;
  let purchase;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        PurchaseService,
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

    advertisement = new Advertisement({
      id: 1,
      uri: '/advertisements/1',
      title: 'first',
      description: '',
      price: 1.0,
      negotiablePrice: false,
      paidShipping: false,
      tags: [],
      category: '',
      brand: '',
      color: '',
      weight: 0.0,
    });

    purchase = new Purchase({
      uri: '/purchases/1',
      purchaser: "user1",
      createdAt: "2016-11-26T12:25:41.45+01:00",
    });
  }));

  describe('#getPurchase(id)', () => {
    it('should return a purchase with its advertisement',
      async(inject([ MockBackend, PurchaseService ], (mockBackend, service) => {
        const responses = [
          new ResponseOptions({
            body: purchase,
          }),
          new ResponseOptions({
            body: advertisement,
          })
        ];

        mockBackend.connections.subscribe((connection: MockConnection) => {
          const response = responses.shift();
          connection.mockRespond(new Response(response));
        });

        service.getPurchase(1).subscribe((data) => {
          expect(data.uri).toEqual(purchase.uri);
          expect(data.purchaser).toEqual(purchase.purchaser);
          expect(data.createdAt).toEqual(purchase.createdAt);
          expect(data.advertisement).toEqual(advertisement);
        });
    })));
  });

  describe('#getPurchaseByAdvertisement(advertisement)', () => {
    it('should return a purchase',
      async(inject([ MockBackend, PurchaseService ], (mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          body: purchase,
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
          connection.mockRespond(new Response(apiResponse));
        });

        service.getPurchaseByAdvertisement(advertisement).subscribe((data) => {
          expect(data.uri).toEqual(purchase.uri);
          expect(data.purchaser).toEqual(purchase.purchaser);
          expect(data.createdAt).toEqual(purchase.createdAt);
          expect(data.advertisement).toEqual(advertisement);
        });
    })));
  });

  describe('#addPurchase(purchase)', () => {
    it('should save a new purchase',
      async(inject([ MockBackend, PurchaseService ], (mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          body: purchase,
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
          connection.mockRespond(new Response(apiResponse));
        });

        // purchase variable is mutable, we want to test whether the API really
        // returns the advertisement object with the purchase one.
        const newPurchase = new Purchase();
        newPurchase.advertisement = advertisement;

        service.addPurchase(newPurchase).subscribe((data) => {
          expect(data.purchaser).toEqual(purchase.purchaser);
          expect(data.advertisement).toEqual(advertisement);
        });
      })));
  });
});
