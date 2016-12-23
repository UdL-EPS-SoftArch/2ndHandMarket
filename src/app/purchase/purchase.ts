import { Advertisement } from '../advertisement/advertisement';

export class Purchase {
  id: number;
  uri: string;
  purchaser: string;
  createdAt: Date;
  advertisements: Advertisement[] = [];

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
