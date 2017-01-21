import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

import { BasketProduct } from './basketProduct';
import { Advertisement } from '../advertisement/advertisement';
import { environment } from '../../environments/environment';

@Injectable()
export class BasketProductService {

  getProducts(): Array<BasketProduct> {
    return (JSON.parse(localStorage.getItem('basket')) || [])
      .map((product) => new BasketProduct({ advertisement: new Advertisement(product.advertisement) }));
  }

  addProduct(newProduct: BasketProduct) {
    const basketProducts = this.getProducts();
    if (basketProducts.some((product) => product.advertisement.uri === newProduct.advertisement.uri)) {
      alert('This product is already in your cart');
      return;
    }
    localStorage.setItem('basket', JSON.stringify(basketProducts.concat(newProduct)));
  }

  removeProduct(removeProduct: BasketProduct) {
    const removedProduct = this.getProducts().filter((product) => product.advertisement.uri !== removeProduct.advertisement.uri);
    localStorage.setItem('basket', JSON.stringify(removedProduct));
  }
}
