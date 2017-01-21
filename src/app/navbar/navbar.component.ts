import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasketProductService } from '../basketProduct/basketProduct.service';
import { MessageService } from '../message/message.service';
import { Message } from '../message/message';
import {Auth0Service} from '../auth0/auth0.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [Auth0Service]
})
export class NavbarComponent implements OnInit {

  appTitle: string = 'Second Hand Market';

  unreadMessages: Message[];

  constructor(public router: Router,
              public basketProductService: BasketProductService,
              private messageService: MessageService,
              private authentication: Auth0Service) {
  }

  ngOnInit() {
    this.getUnreadMessages();
  }

  countBasketProducts(): number {
    return this.basketProductService.getAllProducts().length;
  }


  getUnreadMessages() {
    this.messageService.getAllMessages()
      .subscribe(
        messages => this.unreadMessages = this.messageService.filterUnread(messages),
        error => alert('error'));
  }
}
