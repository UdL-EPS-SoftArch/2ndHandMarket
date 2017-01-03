/* tslint:disable:no-unused-variable */

import {TestBed, async, inject, getTestBed} from '@angular/core/testing';
import {PictureService} from './picture.service';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {BaseRequestOptions, XHRBackend, Http, HttpModule, ResponseOptions, Response
} from '@angular/http';
import {Picture} from './picture';
import {Auth0Service} from '../../auth0/auth0.service';

class ResponseError extends Error {
  json() {
    return '{ \'message\': \'Error\' }';
  }
}

describe('Service: Picture', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        PictureService,
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

  describe('#getAllPictures()', () => {

    it('should return all pictures',
      async(inject([MockBackend, PictureService], (mockBackend, service) => {
        mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            connection.mockRespond(new Response(
              new ResponseOptions({
                  body: { '_embedded': { 'pictures':
                          [ { filename: 'overview.jpg' }, { filename: 'detail.jpg' } ] } }
                  })
              ));
            connection.mockError(new ResponseError());
          });

        service.getAllPictures().subscribe(
          (data) => {
            expect(data.length).toBe(2);
            expect(data[0].filename).toBe('overview.jpg');
            expect(data[1].filename).toBe('detail.jpg');
          });
      }))
    );
  });

  describe('#save(picture)', () => {
    it('should save a new picture',
      async(inject([MockBackend, PictureService], (mockBackend, service) => {
        mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            connection.mockRespond(new Response(
              new ResponseOptions({
                status: 201,
                body: { uri: '/pictures/1', filename: 'overview.jpg' }
              })
            ));
            connection.mockError(new ResponseError());
          });

        let picture: Picture = new Picture();
        picture.filename = 'overview.jpg';

        service.addPicture(picture).subscribe(
            (data) => {
              expect(data.uri).toBe('/pictures/1');
              expect(data.filename).toBe('overview.jpg');
              expect(data.content).toBeUndefined();
            });
        }))
    );
  });

});
