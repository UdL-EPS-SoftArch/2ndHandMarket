import {Component, OnInit } from '@angular/core';
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
  newMessage: Message = new Message();

  constructor(private messageService: MessageService) { }

  ngOnInit() { this.getMessages(); }

  getMessages() {
    return this.messageService.getAllMessages()
      .subscribe(
        messages => this.messages = messages,
        error =>  this.errorMessage = <any>error.message);
  }

  addMessage() {
      this.messageService.addMessage(this.newMessage)
        .subscribe(
          message  => this.messages.push(message),
          error =>  this.errorMessage = <any>error.message);
      this.newMessage = new Message();
  }

  removeMessage(message) {
    this.messageService.deleteMessageByUri(message.uri)
      .subscribe(
        deleted => this.messages = this.messages.filter(p => p.uri !== message.uri),
        error =>  this.errorMessage = <any>error.message);
  }

}
