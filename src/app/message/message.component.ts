import { Component, OnInit } from '@angular/core';
import {Message} from "./message";
import {MessageService} from "./message.service";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  providers: [MessageService]
})
export class MessageComponent implements OnInit {

  messages: Message[] = [];
  errorMessage: string;

  constructor(private messageService: MessageService) { }

  ngOnInit() { this.getMessages(); }

  getMessages() {
    return this.messageService.getAllMessages()
      .subscribe(
        messages => this.messages = messages,
        error =>  this.errorMessage = <any>error.message);
  }

}
