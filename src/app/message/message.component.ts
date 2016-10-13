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

  ngOnInit() { this.getMessages(); this.addMessage() }

  getMessages() {
    return this.messageService.getAllMessages()
      .subscribe(
        messages => this.messages = messages,
        error =>  this.errorMessage = <any>error.message);
  }

  addMessage(/*input*/) {

      this.newMessage.title = "aa";
      this.newMessage.body = "bb";
      this.messageService.addMessage(this.newMessage)
        .subscribe(
          message  => this.messages.push(message),
          error =>  this.errorMessage = <any>error.message);
      this.newMessage = new Message();
  }


}
