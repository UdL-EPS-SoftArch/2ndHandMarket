import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {BasketProduct} from './basketProduct';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {AuthenticationBasicService} from '../login-basic/authentication-basic.service';

@Injectable()
export class BasketProductService {

  products: BasketProduct[] = [];

  constructor () { }

  getAllProducts(): BasketProduct[] {
    return this.products;
  }

  addProduct(product: BasketProduct): void {
    this.products.push(product);
  }
}
