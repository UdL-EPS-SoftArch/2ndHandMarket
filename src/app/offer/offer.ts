export class Offer {
  //id: number;
  uri: string = '';
  date:Date;
  value: number = 0;

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
