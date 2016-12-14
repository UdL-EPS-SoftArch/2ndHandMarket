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
    this.getMySent();
    this.getMyReceived();
    this.getAllMyMessages();
  }

  getMessages() {
    this.messageService.getAllMessages()
      .subscribe(
        messages => this.messages = messages,
        error =>  this.errorMessage = <any>error.message);
  }

  getMySent () {
    this.messageService.getAllMessages()
      .subscribe(
        messages => this.mySentMessages = this.messages
          .filter(p => p.sender === this.newMessage.sender),
        error =>  this.errorMessage = <any>error.message);
  }

  getMyReceived () {
    this.messageService.getAllMessages()
      .subscribe(
        messages => this.myReceivedMessages = this.messages
          .filter(p => p.destination ===  this.newMessage.sender),
        error =>  this.errorMessage = <any>error.message);
  }

  getNotRead () : Message[] {
    this.messageService.getAllMessages()
      .subscribe(
        messages => this.notRead = this.messages.filter(p => p.isRead ==  false),
        error =>  this.errorMessage = <any>error.message);

    return this.notRead;
  }

  getAllMyMessages() {
    this.messageService.getAllMessages()
      .subscribe(
        messages => this.myAllMessages = this.mySentMessages.concat(this.myReceivedMessages),
        error => this.errorMessage = <any>error.message);
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

  //TODO
  setAsRead(message) {
    this.messageService.setAsRead(message)
      .subscribe(
        message  => this.newMessage = message,
        error =>  this.errorMessage = <any>error.message);
  }

  removeMessage(message) {
    this.messageService.deleteMessageByUri(message.uri)
      .subscribe(
        deleted => this.messages = this.messages.filter(p => p.uri !== message.uri),
        error =>  this.errorMessage = <any>error.message);
  }

}
