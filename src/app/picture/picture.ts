export class Picture {
  uri: string = '';
  filename: string = '';
  content: string = '';
  depicts: string;

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
