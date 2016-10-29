/* tslint:disable:no-unused-variable */

import { } from '@angular/core/testing';

import { Advertisement } from './advertisement';

describe('Advertisement', () => {
  it('should create an instance', () => {
    expect(new Advertisement()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    const id = 1;
    const uri = 'advertisement/1';
    const title = 'sample';
    const description = 'sample description';
    const owner = 'user';
    const now = new Date().getTime();
    const price = 80.80;
    const tags = [ 'angular', 'javascript' ];
    const category = 'code';
    const brand = 'new';
    const color = 'blue';
    const weight = 10.1;

    let advertisement = new Advertisement({
      id,
      uri: 'advertisement/1',
      title,
      description,
      owner: 'user',
      createdAt: now,
      modifiedAt: now,
      price,
      negotiablePrice: true,
      paidShipping: true,
      tags,
      category,
      brand,
      color,
      weight,
    });
    expect(advertisement.id).toEqual(id);
    expect(advertisement.uri).toEqual(uri);
    expect(advertisement.title).toEqual(title);
    expect(advertisement.description).toEqual(description);
    expect(advertisement.owner).toEqual(owner);
    expect(advertisement.createdAt).toEqual(now);
    expect(advertisement.modifiedAt).toEqual(now);
    expect(advertisement.price).toEqual(price);
    expect(advertisement.negotiablePrice).toEqual(true);
    expect(advertisement.paidShipping).toEqual(true);
    expect(advertisement.tags).toEqual(tags);
    expect(advertisement.category).toEqual(category);
    expect(advertisement.brand).toEqual(brand);
    expect(advertisement.color).toEqual(color);
    expect(advertisement.weight).toEqual(weight);

    // Text-based tags.
    const newTags = ['rey', 'jedi'];
    advertisement.tagsStr = ' rey    ,     jedi ';
    expect(advertisement.tags).toEqual(newTags);
    expect(advertisement.tagsStr).toEqual('rey,jedi');
  });
});
