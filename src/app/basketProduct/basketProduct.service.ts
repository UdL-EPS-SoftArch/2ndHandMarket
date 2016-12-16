import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {BasketProduct} from './basketProduct';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {AuthenticationBasicService} from '../login-basic/authentication-basic.service';

@Injectable()
export class BasketProductService {

  products: BasketProduct[] = [];
  productsId: number[] = [];

  constructor() { }

  getAllProducts(): BasketProduct[] {
    return this.products;
  }

  addProduct(product: BasketProduct): void {
    if (this.productsId.indexOf(product.product.id) === -1) {
      this.products.push(product);
      this.productsId.push(product.product.id);
    } else {
      alert('This product is already in your cart');
    }
  }

  removeProduct(product): void {
    let i = this.products.indexOf(product);
    this.products.splice(i, 1);
    this.productsId.splice(i, 1);
  }
}
