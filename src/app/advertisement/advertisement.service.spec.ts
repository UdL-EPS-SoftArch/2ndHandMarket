/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { BaseRequestOptions, XHRBackend, Http, HttpModule, ResponseOptions, Response
} from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { AdvertisementService } from './advertisement.service';
import { Advertisement } from './advertisement';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';
import { Picture } from './picture/picture';

describe('Service: Advertisement', () => {
  const firstAdvertisement = new Advertisement({
    title: 'first',
    uri: '/advertisement/1',
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

  const secondAdvertisement = new Advertisement({
    title: 'second',
    uri: '/advertisement/2',
    description: '',
    price: 2.0,
    negotiablePrice: false,
    paidShipping: false,
    tags: [],
    category: '',
    brand: '',
    color: '',
    weight: 0.0,
  });

  const firstPicture = new Picture({
    uri: '/pictures/1',
    filename: 'picture1.jpg',
    content: 'data:image/jpeg;base64,',

    // WARNING! Depicts is not a response field, it is only used when submitting
    // data. API returns depicts inside _links: { depicts: { href: {} } }
    depicts: '/advertisements/1',
  });

  const secondPicture = new Picture({
    uri: '/pictures/2',
    filename: 'picture2.jpg',
    content: 'data:image/jpeg;base64,',

    // WARNING! Depicts is not a response field, it is only used when submitting
    // data. API returns depicts inside _links: { depicts: { href: {} } }
    depicts: '/advertisements/2',
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        AdvertisementService,
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

  describe('#getAllAdvertisements()', () => {
    it('should return all pictures',
      async(inject([ MockBackend, AdvertisementService ], (mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          body: {
            _embedded: {
              advertisements: [
                firstAdvertisement,
                secondAdvertisement,
              ]
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

  describe('#getAdvertisement(id)', () => {
    it('should return an advertisement',
      async(inject([ MockBackend, AdvertisementService ], (mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          body: JSON.stringify(firstAdvertisement)
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
          connection.mockRespond(new Response(apiResponse));
        });

        service.getAdvertisement(1).subscribe((data) => {
          expect(data.title).toEqual(firstAdvertisement.title);
          expect(data.description).toEqual(firstAdvertisement.description);
          expect(data.id).toEqual(1);
        });
      })));
  });

  describe('#getAdvertisementPictures(uri)', () => {
    it('should return an advertisement pictures',
      async(inject([ MockBackend, AdvertisementService ], (mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          body: {
            '_embedded': {
              'pictures': [
                firstPicture
              ]
            }
          }
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
          connection.mockRespond(new Response(apiResponse));
        });

        service.getAdvertisementPictures('/advertisement/1').subscribe((data) => {
          expect(data.length).toBe(1);
          expect(data[0].uri).toEqual(firstPicture.uri);
          expect(data[0].filename).toEqual(firstPicture.filename);
        });
      })));

    it('should return pictures in desc order (by creation date)',
      async(inject([ MockBackend, AdvertisementService ], (mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          body: {
            '_embedded': {
              'pictures': [
                firstPicture,
                secondPicture
              ]
            }
          }
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
          connection.mockRespond(new Response(apiResponse));
        });

        service.getAdvertisementPictures('/advertisement/1').subscribe((data) => {
          expect(data.length).toBe(2);
          expect(data[0].uri).toEqual(secondPicture.uri);
          expect(data[1].uri).toEqual(firstPicture.uri);
          expect(data[0].filename).toEqual(secondPicture.filename);
          expect(data[1].filename).toEqual(firstPicture.filename);
        });
    })));
  });

  describe('#addAdvertisement(advertisement)', () => {
    it ('should save a new advertisement',
      async(inject([ MockBackend, AdvertisementService ], (mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          status: 201,
          body: JSON.stringify(firstAdvertisement)
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
          connection.mockRespond(new Response(apiResponse));
        });

        service.addAdvertisement(firstAdvertisement).subscribe((data) => {
          expect(data.title).toEqual(firstAdvertisement.title);
          expect(data.description).toEqual(firstAdvertisement.description);
          expect(data.price).toEqual(firstAdvertisement.price);
          expect(data.id).toEqual(1);
        });
      })));
  });

  describe('#updateAdvertisement(advertisement)', () => {
    it ('should update the advertisement',
      async(inject([ MockBackend, AdvertisementService ], (mockBackend, service) => {
        const notUpdatedAdvertisement = new Advertisement({
          uri: '/advertisements/1',
          title: 'something',
          price: 2,
        });
        const apiResponse = new ResponseOptions({
          status: 201,
          body: JSON.stringify(secondAdvertisement),
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
          connection.mockRespond(new Response(apiResponse));
        });

        service.putAdvertisement(notUpdatedAdvertisement).subscribe((data) => {
          expect(data.title).toEqual(secondAdvertisement.title);
          expect(data.description).toEqual(secondAdvertisement.description);
          expect(data.price).toEqual(secondAdvertisement.price);
          expect(data.id).toEqual(2);
        });
      })));
  });

  describe('#deleteAdvertisement(id)', () => {
    it ('should delete the advertisement',
      async(inject([ MockBackend, AdvertisementService ], (mockBackend, service) => {
        const apiResponse = new ResponseOptions({
          status: 204
        });

        mockBackend.connections.subscribe((connection: MockConnection) => {
          connection.mockRespond(new Response(apiResponse));
        });

        const advertisementId = 1;
        service.deleteAdvertisement(advertisementId).subscribe((data) => {

        });
      })));
  });
});
