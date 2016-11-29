import {Advertisement} from "../advertisement/advertisement";
export class BasketProduct {
  // id: number;
  uri: string = '';
  title:string = '';
  price: number = 0.0;
  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
