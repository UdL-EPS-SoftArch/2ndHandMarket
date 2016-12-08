import {Component} from '@angular/core';
import {BasketProductService} from "../basketProduct/basketProduct.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  appTitle: string = 'Second Hand Market';

  constructor(private basketProductService: BasketProductService) { }

  countBasketProducts(): number {
    return this.basketProductService.getAllProducts().length;
  }
}
