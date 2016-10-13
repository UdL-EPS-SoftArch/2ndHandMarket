export class RegisterSeller {
  id: number;
  name: string = '';
  mail: string = '';
  password: string = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
