export class SellerOffer {
  seller_offer_id: number;
  value: number;
  date: Date;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
