import {Authority} from './authority';

export class User {
  username: string = '';
  name: string = '';
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
}
