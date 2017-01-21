/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { Http} from '@angular/http';
import { Router } from '@angular/router';

import { BasketProductComponent } from './basketProduct.component';
import { BasketProductService } from './basketProduct.service';

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [Http, BasketProductService]
  });
});

describe('Component: BasketProduct', () => {
  inject([BasketProductService, Router], (basketProductService, router) => {
    let component = new BasketProductComponent(basketProductService, router);
    expect(component).toBeTruthy();
  });
});
