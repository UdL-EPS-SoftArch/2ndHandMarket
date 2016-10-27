import {Authority} from './authority';

export class User {
  username: string = '';
  authorities: Authority[] = [];
  authorization: string = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
