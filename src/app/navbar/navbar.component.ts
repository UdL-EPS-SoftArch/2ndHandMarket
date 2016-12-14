import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BasketProductService } from '../basketProduct/basketProduct.service';
import { MessageService} from "../message/message.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  appTitle: string = 'Second Hand Market';

  constructor(public router: Router,
              public basketProductService: BasketProductService,
              private message: MessageService) {
  }

  /*countBasketProducts(): number {
    return this.basketProductService.getAllProducts().length;
  }*/

  countUnReadMessages(): number {
    return this.message.getNotRead();
  }

  countBasketProducts(): number {
    return this.basketProductService.getAllProducts().length;
  }

  /*countUnReadMessages(): number {
    return this.messageService.getNotRead();
  }*/
}
