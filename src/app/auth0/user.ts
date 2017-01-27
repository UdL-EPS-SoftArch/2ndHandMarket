import {Authority} from './authority';

export class User {
  uri = '';
  name = '';
  authorities: Authority[] = [];
  authorization = '';
  password = '';
  lastname = '';
  displayName = '';
  email = '';
  birthday = '';
  country = '';
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
