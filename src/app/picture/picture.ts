export class Picture {
  uri: string = '';
  filename: string = '';
  content: string = '';

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
