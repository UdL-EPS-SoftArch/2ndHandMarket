import {Authority} from './authority';

export class User {
  username: string = '';
  name: string = '';
  authorities: Authority[] = [];
  authorization: string = ''; // That's not secure at all.
                              // Should be changed for a token or session.
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
}
