import {Advertisement} from "../advertisement/advertisement";
export class BasketProduct {
  // id: number;
  uri: string = '';
  product: Advertisement;
  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
