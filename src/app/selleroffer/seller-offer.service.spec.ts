/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, XHRBackend, Http, HttpModule, ResponseOptions, Response } from '@angular/http';

import { SellerOfferService } from './seller-offer.service';
import { SellerOffer } from './seller-offer';

class ResponseError extends Error {
  json() {
    return '{ \'message\': \'Error\' }';
  }
}

describe('Service: SellerOffer', () => {
  const firstSellerOffer = {
    "seller_offer_id": 1,
    "value": 10,
    "date": "",
  };

  const secondSellerOffer = {
    "seller_offer_id": 2,
    "value": 20,
    "date": "",
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        SellerOfferService,
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

  describe('#getAllSellerOffers()', () => {
    it('should return all SellerOffers',
      async(inject([MockBackend, SellerOfferService], (mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          body: {
            '_embedded': {
              'sellerOffers': [ firstSellerOffer, secondSellerOffer ]
            }
          }
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
            connection.mockRespond(new Response(apiResponse));
        });

        service.getAllSellerOffers().subscribe((data) => {
          expect(data.length).toBe(2);
          expect(data[0].seller_offer_id).toEqual(firstSellerOffer.seller_offer_id);
          expect(data[1].seller_offer_id).toEqual(secondSellerOffer.seller_offer_id);
          expect(data[0].value).toEqual(firstSellerOffer.value);
          expect(data[1].value).toEqual(secondSellerOffer.value);
        })
      })));
  });
});
