import {Authority} from './authority';

export class User {
  uri: string = '';
  name: string = '';
  authorities: Authority[] = [];
  authorization: string = '';
  password: string = '';
  lastname: string  = '';
  displayName: string = '';
  email: string = '';
  birthday: string = '';
  country: string = '';
  enabled: boolean;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

  get username(): string {
    const parts = this.uri.split('/');
    return parts.length === 3 ? parts[2] : null;
  }

  set username(val) {}
}
