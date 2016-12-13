export class Advertisement {
  id: number;
  uri: string;
  title: string = '';
  description: string = '';
  owner: string = '';
  createdAt = Date;
  modifiedAt = Date;
  price: number = 0;
  negotiablePrice: boolean = false;
  paidShipping: boolean = false;
  tags: string[] = [];
  category: string = '';
  brand: string = '';
  color: string = '';
  weight: number = 0;

  // Tags as string 'first, second, third'.
  get tagsStr(): string {
    return this.tags.join(',');
  }

  set tagsStr(input) {
    this.tags = input.split(',').map((tag) => tag.trim());
  }

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }
}
