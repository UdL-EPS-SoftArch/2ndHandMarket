export class RegisterSeller {
  uri: string ='';
  name: string = '';
  mail: string = '';
  password: string = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
