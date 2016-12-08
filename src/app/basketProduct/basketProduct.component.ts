import {Component, OnInit } from '@angular/core';
import {BasketProduct} from './basketProduct';
import {BasketProductService} from './basketProduct.service';
import {AuthenticationBasicService} from '../login-basic/authentication-basic.service';

@Component({
  selector: 'app-basketProduct',
  templateUrl: './basketProduct.component.html',
  styleUrls: ['./basketProduct.component.css'],
})
export class BasketProductComponent implements OnInit {

  products: BasketProduct[];

  constructor(private basketProductService: BasketProductService) { }

  ngOnInit() {
    this.products = this.getProducts();
  }

  getProducts(): BasketProduct[] {
    return this.basketProductService.getAllProducts();
  }
}
