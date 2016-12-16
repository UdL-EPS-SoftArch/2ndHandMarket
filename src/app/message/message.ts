export class Message {
  uri: string = '';
  title: string = '';
  body: string = '';
  destination: string = '';
  sender: string = '';
  isRead: boolean;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
