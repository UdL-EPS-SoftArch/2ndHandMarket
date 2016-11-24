import {Component, OnInit } from '@angular/core';
import {Message} from './message';
import {MessageService} from './message.service';
import {AuthenticationBasicService} from '../login-basic/authentication-basic.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css'],
  providers: [MessageService, AuthenticationBasicService]
})
export class MessageComponent implements OnInit {

  messages: Message[] = [];
  mySentMessages: Message[] = [];
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
  }

  getMessages() {
    return this.messageService.getAllMessages()
      .subscribe(
        messages => this.messages = messages,
        error =>  this.errorMessage = <any>error.message);
  }

  getMySent () {
    return this.messageService.getAllMessages()
      .subscribe(
        messages => this.mySentMessages = this.messages.filter(p => p.sender ==  this.newMessage.sender),
        error =>  this.errorMessage = <any>error.message);
  }

  getMessageByUri(uri) {
    return this.messageService.getMessageByUri(uri)
      .subscribe(
        message => this.messagesUri = [message],
        error =>  this.errorMessage = <any>error.message);
  }

  getMessageByTitle (title) {
    return this.messageService.getAllMessages()
      .subscribe(
        message => this.messagesTitle = this.messages.filter(p => p.title == title),
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

  removeMessage(message) {
    this.messageService.deleteMessageByUri(message.uri)
      .subscribe(
        deleted => this.messages = this.messages.filter(p => p.uri !== message.uri),
        error =>  this.errorMessage = <any>error.message);
  }

}
