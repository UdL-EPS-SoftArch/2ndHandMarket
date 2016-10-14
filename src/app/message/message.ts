export class Message {
  uri: string = '';
  title: string = '';
  body: string = '';
  destination: string = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
