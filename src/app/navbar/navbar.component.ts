import {Component} from '@angular/core';
import {BasketProductService} from "../basketProduct/basketProduct.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  appTitle: string = 'Second Hand Market';

  constructor(private router: Router, private basketProductService: BasketProductService) { }

  countBasketProducts(): number {
    return this.basketProductService.getAllProducts().length;
  }

}
