/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { BaseRequestOptions, XHRBackend, Http, HttpModule, ResponseOptions, Response } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AdvertisementService } from './advertisement.service';
import { Advertisement } from './advertisement';

class ResponseError extends Error {
  json() {
    return '{ \'message\': \'Error\' }';
  }
}

describe('Service: Advertisement', () => {
  const firstAdvertisement = {
    'title': 'first',
    'description': '',
    'price': 1.0,
    'negotiablePrice': false,
    'paidShipping': false,
    'tags': [],
    'category': '',
    'brand': '',
    'color': '',
    'weight': 0.0,
  };

  const secondAdvertisement = {
    'title': 'second',
    'description': '',
    'price': 2.0,
    'negotiablePrice': false,
    'paidShipping': false,
    'tags': [],
    'category': '',
    'brand': '',
    'color': '',
    'weight': 0.0,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AdvertisementService,
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

  describe('#getAllAdvertisements()', () => {
    it('should return all pictures',
      async(inject([ MockBackend, AdvertisementService ], (mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          body: {
            '_embedded': {
              'advertisements': [ firstAdvertisement, secondAdvertisement ]
            }
          }
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
            connection.mockRespond(new Response(apiResponse));
        });

        service.getAllAdvertisements().subscribe((data) => {
          expect(data.length).toBe(2);
          expect(data[0].title).toEqual(firstAdvertisement.title);
          expect(data[1].title).toEqual(secondAdvertisement.title);
          expect(data[0].description).toEqual(firstAdvertisement.description);
          expect(data[1].description).toEqual(secondAdvertisement.description);
        });
      })));
  });

  describe('#addAdvertisement(advertisement)', () => {
    it ('should save a new advertisement',
      async(inject([ MockBackend, AdvertisementService ], (mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          status: 201,
          body: firstAdvertisement
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
          connection.mockRespond(new Response(apiResponse));
        });

        service.addAdvertisement().subscribe((data) => {
          expect(data.title).toEqual(firstAdvertisement.title);
          expect(data.description).toEqual(firstAdvertisement.description);
          expect(data.price).toEqual(firstAdvertisement.price);
        });
      })));
  });
});
