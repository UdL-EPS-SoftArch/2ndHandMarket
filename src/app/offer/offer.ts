export class Offer {
  uri: string = '';
  filename: string = '';
  value: number = 0;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
