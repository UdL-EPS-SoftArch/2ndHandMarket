export class Message {
  uri: string = '';
  title: string = '';
  body: string = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
