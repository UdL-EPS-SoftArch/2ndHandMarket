import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BasketProductService } from '../basketProduct/basketProduct.service';
import { MessageService } from '../message/message.service';
import { Message } from '../message/message';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  appTitle: string = 'Second Hand Market';

  unreadMessages: Message[];

  constructor(public router: Router,
              public basketProductService: BasketProductService,
              private messageService: MessageService) {
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
