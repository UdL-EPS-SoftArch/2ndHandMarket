export class Message {
  uri = '';
  title = '';
  body = '';
  destination = '';
  sender = '';
  isRead: boolean;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
