import {Authority} from './authority';

export class User {
  username: string = '';
  authorities: Authority[] = [];
  authorization: string = '';
  lastname: string  = '';
  email: string = '';
  birthday: string = '';
  country: string = '';
  enabled: boolean;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  get name() {
    return this.username;
  }

  set name(name: string) {
    this.username = name;
  }
}
