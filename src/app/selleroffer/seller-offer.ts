export class SellerOffer {
  uri: string = '';
  seller_offer_id: number;
  value: number;
  date: Date;

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
