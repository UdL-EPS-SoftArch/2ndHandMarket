export class RegisterSeller {
  uri = '';
  name = '';
  mail = '';
  password = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
