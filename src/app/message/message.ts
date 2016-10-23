import {environment} from "../../environments/environment";
export class Message {
  uri: string = '';
  title: string = '';
  body: string = '';
  destination: string = '';
  sender: string = environment.user;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
