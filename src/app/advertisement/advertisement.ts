export class Advertisement {
  id: number;
  uri: string;
  title: string;
  description: string;
  owner: string;
  createdAt: Date;
  modifiedAt: Date;
  price: number;
  negotiablePrice: boolean;
  paidShipping: boolean;
  tags: string[];
  category: string;
  brand: string;
  color: string;
  weight: number;

  // Tags as string 'first, second, third'.
  get tagsStr(): string {
    return this.tags && this.tags.join(',');
  }

  set tagsStr(input) {
    this.tags = input.split(',').map((tag) => tag.trim());
  }

  constructor(values: Object = {}) {
    (<any>Object).assign(this, values);
  }

  getUriId(): number {
    return this.uri ? Number(this.uri.split('/')[2]) : null;
  }
}

