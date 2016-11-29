/* tslint:disable:no-unused-variable */

import { } from '@angular/core/testing';

import {Picture} from './picture';

describe('Picture', () => {
  it('should create an instance', () => {
    expect(new Picture()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    const filename = 'test.jpg';
    const content = 'data:image/jpeg;base64,1234';
    const depicts = 'advertisement/1';
    let picture = new Picture({
      filename,
      content,
      depicts,
    });
    expect(picture.filename).toEqual(filename);
    expect(picture.content).toEqual(content);
    expect(picture.depicts).toEqual(depicts);
  });

});
