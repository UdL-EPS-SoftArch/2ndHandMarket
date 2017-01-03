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
  totalPrice: number;

  constructor(private basketProductService: BasketProductService,
              private router: Router) { }

  ngOnInit() {
    this.products = this.getProducts();
    this.totalPrice = this.getTotalPrice();
  }

  getProducts(): BasketProduct[] {
    return this.basketProductService.getAllProducts();
  }
  deleteProduct(product) {
    this.basketProductService.removeProduct(product);
    this.totalPrice = this.getTotalPrice();
  }

  getTotalPrice(): number {
    let total = 0.0;
    for (let prod of this.products){
      total += prod.product.price;
    }
    return total;
  }

  redirectToPurchase() {
    const productIds = this.products.map((product) => product.product.id).join(',');
    this.router.navigate([`/advertisements/${productIds}/purchase`]);
  }

}

