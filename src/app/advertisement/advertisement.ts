export class Advertisement {
  id: number;
  title: string = '';
  description: string = '';
  owner: string = '';
  createdAt = Date;
  modifiedAt = Date;
  price: number = 0.0;
  negotiablePrice: boolean = false;
  paidShipping: boolean = false;
  tags: string[] = [];
  category: string = '';
  brand: string = '';
  color: string = '';
  weight: number = 0.0;

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
