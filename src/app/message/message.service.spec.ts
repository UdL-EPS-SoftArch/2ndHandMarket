
import { TestBed, async, inject } from '@angular/core/testing';
import { MessageService } from './message.service';
import {MockBackend, MockConnection} from "@angular/http/testing";
import {BaseRequestOptions, XHRBackend, Http, HttpModule, ResponseOptions, Response} from '@angular/http';
import {Message} from "./message";



class ResponseError extends Error {
  json() {
    return '{ \'message\': \'Error\' }';
  }
}

describe('Service: Message', () => {

  /*
  const firstMessage = new Message({
    'title': 'TitleTest',
    'body': 'BodyTest',
    'destination' : 'DestinationTest',
  });*/

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        MessageService,
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

  describe('#getAllMessages()', () => {

    it('should return all messages',
      async(inject([ MockBackend, MessageService ], (mockBackend, service) => {
        mockBackend.connections.subscribe(
          (connection: MockConnection) => {
            connection.mockRespond(new Response(
              new ResponseOptions({
                body: { '_embedded': { 'privateMessages':
                  [ { title: 'TitleTest1' }, { title: 'TitleTest2' } ] } }

              })
            ));
            connection.mockError(new ResponseError());
          });

        service.getAllMessages().subscribe((data) => {
          expect(data.length).toBe(2);
          expect(data[0].title).toBe('TitleTest1');
          expect(data[1].title).toBe('TitleTest2');
        });
      })));
  });

  it('should ...', inject([MessageService], (service: MessageService) => {
    expect(service).toBeTruthy();
  }));
});
