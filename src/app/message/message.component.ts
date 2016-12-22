import { Component, OnInit } from '@angular/core';
import { Message } from './message';
import { MessageService } from './message.service';
import { AuthenticationBasicService } from '../login-basic/authentication-basic.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  providers: [MessageService, AuthenticationBasicService]
})
export class MessageComponent implements OnInit {

  DivSendMessage;
  DivSentMessage;
  DivFindMessage;
  DivAllMessage;
  DivReceivedMessage;


  messages: Message[] = [];
  mySentMessages: Message[] = [];
  myReceivedMessages: Message[] = [];
  myAllMessages: Message[] = [];
  unreadMessages: Message[] = [];

  messagesUri: Message[] = [];
  messagesTitle: Message[] = [];

  errorMessage: string;
  newMessage: Message;

  constructor(private messageService: MessageService,
               private authentication: AuthenticationBasicService) { }

  ngOnInit() {
    this.getMessages();
    this.newMessage = new Message();
    this.newMessage.sender = this.authentication.getCurrentUser().username;
  }

  getMessages() {
    const username = this.authentication.getCurrentUser().username;
    this.messageService.getAllMessages()
      .subscribe(
        messages => {
          this.messages = messages;
          this.mySentMessages = this.messageService.filterBySender(messages, username);
          this.myReceivedMessages = this.messageService.filterByDestination(messages, username);
          this.unreadMessages = this.messageService.filterUnread(messages);
        },
        error =>  this.errorMessage = <any>error.message);
  }

  getMessageByUri(uri) {
    this.messageService.getMessageByUri(uri)
      .subscribe(
        message => this.messagesUri = [message],
        error =>  this.errorMessage = <any>error.message);
  }

  getMessageByTitle (title) {
    this.messageService.getAllMessages()
      .subscribe(
        message => this.messagesTitle = this.messages.filter(p => p.title === title),
        error =>  this.errorMessage = <any>error.message);
  }

  addMessage() {
    this.messageService.addMessage(this.newMessage)
      .subscribe(
        message  => this.messages.push(message),
        error =>  this.errorMessage = <any>error.message);
    this.newMessage = new Message();
    this.newMessage.sender = this.authentication.getCurrentUser().username;
  }

  // TODO
  setAsRead(message) {
    this.messageService.setAsRead(message)
      .subscribe(
        newMessage  => this.newMessage = newMessage,
        error =>  this.errorMessage = <any>error.message);
  }

  removeMessage(message) {
    this.messageService.deleteMessageByUri(message.uri)
      .subscribe(
        deleted => this.messages = this.messages.filter(p => p.uri !== message.uri),
        error =>  this.errorMessage = <any>error.message);
  }

}
