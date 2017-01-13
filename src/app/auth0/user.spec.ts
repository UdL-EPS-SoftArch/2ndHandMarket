/* tslint:disable:no-unused-variable */

import { User } from './user';

describe('Advertisement', () => {
  it('should create an instance', () => {
    expect(new User()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    const values = { name: 'sample' };
    expect(new User(values).name).toBe('sample');
  });

  it('should return username from uri', () => {
    expect(new User().username).toBe(null);

    const values = { uri: '/users/facebook|1' };
    expect(new User(values).username).toBe('facebook|1');
  });
});
