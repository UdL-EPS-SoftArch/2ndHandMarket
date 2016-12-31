export class BuyerOffer {
  uri: string = '';
  buyer_id: number;
  advertisement_id: number;
  advertisement_title: string;
  advertisement_seller: string;
  advertisement_iniPrice: number;
  value: number;
  date: Date;
  accepted: boolean = false;

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
