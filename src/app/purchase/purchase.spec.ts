/* tslint:disable:no-unused-variable */

import { Purchase } from './purchase';
import { Advertisement } from '../advertisement/advertisement';

describe('Advertisement', () => {
  it('should create an instance', () => {
    expect(new Purchase()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    const id = '1';
    const uri = '/purchases/1';
    const purchaser = 'user1';
    const createdAt = '2016-11-26T12:25:41.45+01:00';
    const advertisementTitle = 'sample';

    const advertisement = new Advertisement({
      title: advertisementTitle,
    });
    const purchase = new Purchase({
      id,
      uri,
      purchaser,
      createdAt,
      advertisement,
    });

    expect(purchase.id).toEqual(id);
    expect(purchase.uri).toEqual(uri);
    expect(purchase.purchaser).toEqual(purchaser);
    expect(purchase.createdAt).toEqual(createdAt);
    expect(purchase.advertisement).toEqual(advertisement);
  });
});
