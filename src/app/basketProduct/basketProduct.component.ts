import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BasketProduct } from './basketProduct';
import { BasketProductService } from './basketProduct.service';

@Component({
  selector: 'app-basket-product',
  templateUrl: './basketProduct.component.html',
  styleUrls: ['./basketProduct.component.css'],
})
export class BasketProductComponent implements OnInit {

  products: BasketProduct[];

  constructor(private basketProductService: BasketProductService,
              private router: Router) { }

  ngOnInit() {
    this.refreshProducts();
  }

  refreshProducts() {
    this.products = this.basketProductService.getProducts();
  }

  deleteProduct(product: BasketProduct) {
    this.basketProductService.removeProduct(product);
    this.refreshProducts();
  }

  getTotal(): number {
    return this.products.reduce((acc, product) => acc + product.advertisement.price, 0);
  }

  redirectToPurchase() {
    const productIds = this.products.map((product) => product.advertisement.id).join(',');
    this.router.navigate([`/advertisements/${productIds}/purchase`]);
  }

}

