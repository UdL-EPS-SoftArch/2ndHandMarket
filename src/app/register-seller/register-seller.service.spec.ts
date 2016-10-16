/* tslint:disable:no-unused-variable */
import {TestBed, async, inject, getTestBed} from '@angular/core/testing';
import {PictureService} from './picture.service';
import {MockBackend, MockConnection} from '@angular/http/testing';
import {BaseRequestOptions, XHRBackend, Http, HttpModule, ResponseOptions, Response} from '@angular/http';
import {Picture} from './.';
import {RegisterSellerService} from "./register-seller.service";


describe('Service: RegisterSeller', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisterSellerService]
    });
  });

  it('should ...', inject([RegisterSellerService], (service: RegisterSellerService) => {
    expect(service).toBeTruthy();
  }));
});
