export class BuyerOffer {
  uri: string = '';
  buyerOfferId: number;
  value: number;
  date: Date;

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
