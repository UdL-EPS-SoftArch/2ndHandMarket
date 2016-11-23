export class BuyerOffer {
  uri: string = '';
  buyer_offer_id: number;
  value: number;
  date: Date;

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
