/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { BaseRequestOptions, XHRBackend, Http, HttpModule, ResponseOptions, Response
} from '@angular/http';

import { BuyerOfferService } from './buyeroffer.service';
import { BuyerOffer } from './buyeroffer';

describe('Service: BuyerOffer', () => {
  const firstBuyerOffer = {
    'buyer_offer_id': 1,
    'value': 10,
    'date': '',
  };

  const secondBuyerOffer = {
    'buyer_offer_id': 2,
    'value': 20,
    'date': '',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        BuyerOfferService,
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

  describe('#getAllBuyerOffers()', () => {
    it('should return all BuyerOffers',
      async(inject([MockBackend, BuyerOfferService], (mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          body: {
            '_embedded': {
              'buyerOffers': [ firstBuyerOffer, secondBuyerOffer ]
            }
          }
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
            connection.mockRespond(new Response(apiResponse));
        });

        service.getAllBuyerOffers().subscribe((data) => {
          expect(data.length).toBe(2);
          expect(data[0].buyer_offer_id).toEqual(firstBuyerOffer.buyer_offer_id);
          expect(data[1].buyer_offer_id).toEqual(secondBuyerOffer.buyer_offer_id);
          expect(data[0].value).toEqual(firstBuyerOffer.value);
          expect(data[1].value).toEqual(secondBuyerOffer.value);
        });
      })));
  });
});
