/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OfferService } from './offer.service';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {BaseRequestOptions, XHRBackend, Http, HttpModule, ResponseOptions, Response} from '@angular/http';


describe('Service: Offer', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        OfferService,
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

  /*describe('#getAllOffers()', () => {

    it('should return all offers',
      async(inject([MockBackend, OfferService], (mockBackend, service) => {
        mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            connection.mockRespond(new Response(
              new ResponseOptions({
                body: { '_embedded': { 'offers':
                  [ { filename: 'overview.jpg' }, { filename: 'detail.jpg' } ] } }
              })
            ));
            //connection.mockError(new ResponseError());
          });
      }))
    );
  });

  describe('#save(offer)', () => {

    it('should save a new offer',
      async(inject([MockBackend, OfferService], (mockBackend, service) => {
        mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            connection.mockRespond(new Response(
              new ResponseOptions({
                status: 201,
                body: { uri: '/offer/1', filename: 'overview.jpg' }
              })
            ));
            //connection.mockError(new ResponseError());
          });
      }))
    );
  });*/
});
