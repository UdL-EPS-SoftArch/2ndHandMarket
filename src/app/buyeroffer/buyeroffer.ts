/*import {Advertisement} from "../advertisement/advertisement";*/

export class BuyerOffer {
  uri: string = '';
  /*advOffers: string;*/
  advertisement: string;
  buyer_id: string;
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
