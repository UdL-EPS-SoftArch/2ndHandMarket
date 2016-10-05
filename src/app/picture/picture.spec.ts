/* tslint:disable:no-unused-variable */

import { } from '@angular/core/testing';

import {Picture} from './picture';

describe('Picture', () => {
  it('should create an instance', () => {
    expect(new Picture()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    let picture = new Picture({
      filename: 'test.jpg',
      content: 'data:image/jpeg;base64,1234'
    });
    expect(picture.filename).toEqual('test.jpg');
    expect(picture.content).toEqual('data:image/jpeg;base64,1234');
  });

});
