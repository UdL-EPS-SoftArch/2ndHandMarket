export class Offer {
  id: number;
  filename: string = '';
  value: number = 0;

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
