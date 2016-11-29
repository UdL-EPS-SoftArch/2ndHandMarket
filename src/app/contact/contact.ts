export class Contact {

  name : string = '';
  email: string = '';
  content: string = '';
  phoneNumber: number;

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
