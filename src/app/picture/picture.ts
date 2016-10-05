export class Picture {
  uri: string = '';
  filename: string = '';
  content: string = '';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
