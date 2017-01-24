/* tslint:disable:no-unused-variable */

import { } from '@angular/core/testing';
import {Message} from './message';

describe('Message', () => {
  it('should create an instance', () => {
    expect(new Message()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    const uri = "/privateMessages/5";
    const title = "TestMessage";
    const body = "TestBody";
    const destination = "TestDestination";
    const sender = "TestSender";
    const isRead = true;

    let _message = new Message({
      uri: uri,
      title: title,
      body: body,
      destination: destination,
      sender: sender,
      isRead: isRead,
    });

    expect(_message.uri).toEqual(uri);
    expect(_message.title).toEqual(title);
    expect(_message.body).toEqual(body);
    expect(_message.destination).toEqual(destination);
    expect(_message.sender).toEqual(sender);
    expect(_message.isRead).toEqual(isRead);
  });
});
