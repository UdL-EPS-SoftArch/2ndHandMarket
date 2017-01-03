export default class API {
  uri: string;

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }

  get id(): number {
    return this.uri && Number(this.uri.split('/')[2]);
  }
}
