export class BuyerOffer {
  uri: string = '';
  buyer_id: number;
  advertisement_id: number;
  value: number;
  date: Date;

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
