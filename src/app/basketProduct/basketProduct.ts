import { Advertisement } from '../advertisement/advertisement';

export class BasketProduct {
  advertisement: Advertisement;

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
