/*import {Advertisement} from "../advertisement/advertisement";*/

export class BuyerOffer {
  uri = '';
  advertisement: string;
  buyer_id: string;
  advertisement_id: number;
  advertisement_title: string;
  advertisement_seller: string;
  advertisement_iniPrice: number;
  value: number;
  date: Date;
  accepted = false;

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
