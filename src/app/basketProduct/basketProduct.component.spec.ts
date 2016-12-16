/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { BasketProductComponent } from './basketProduct.component';
import { BasketProductService } from './basketProduct.service';
import { Http} from '@angular/http';

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [Http, BasketProductService]
  });
});

describe('Component: BasketProduct', () => {
  inject([BasketProductService], (basketProductService) => {
    let component = new BasketProductComponent(basketProductService);
    expect(component).toBeTruthy();
  });
});
