import {Advertisement} from "../advertisement/advertisement";

export class BuyerOffer {
  uri: string = '';
  advOffers: string;
  advertisement: string;
  buyer_id: number;
  advertisement_id: number;
  advertisement_title: string;
  advertisement_seller: string;
  advertisement_iniPrice: number;
  value: number;
  date: Date;

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
