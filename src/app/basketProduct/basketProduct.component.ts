import {Component, OnInit } from '@angular/core';
import {BasketProduct} from './basketProduct';
import {BasketProductService} from './basketProduct.service';
import {AuthenticationBasicService} from '../login-basic/authentication-basic.service';

@Component({
  selector: 'app-basketProduct',
  templateUrl: './basketProduct.component.html',
  styleUrls: ['./basketProduct.component.css'],
  providers: [BasketProductService]
})
export class BasketProductComponent implements OnInit {

  products: BasketProduct[];
  errorMessage: string;
  newBasketProduct: BasketProduct;

  constructor(private basketProductService: BasketProductService) { }

  ngOnInit() {
    this.getProducts();
    this.newBasketProduct = new BasketProduct();
  }

  getProducts() {
    //console.log(this.basketProductService.products[0].product);
    return this.basketProductService.getAllProducts()
      .subscribe(
        products => this.products = this.basketProductService.getArrayProducts(),
       error =>  this.errorMessage = <any>error.message)
  }
/*
  addProduct() {
    this.basketProductService.addProduct(this.newBasketProduct)
      .subscribe(
        product  => this.products.push(product),
        error =>  this.errorMessage = <any>error.message);
    this.newBasketProduct = new BasketProduct();
  }

  removeProduct(product) {
    this.basketProductService.deleteProductByUri(product.uri)
      .subscribe(
        deleted => this.products = this.products.filter(p => p.uri !== product.uri),
        error =>  this.errorMessage = <any>error.message);
  }*/

}
