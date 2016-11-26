/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';

import { PurchaseComponent } from './purchase.component';
import { PurchaseService } from './purchase.service';

describe('Component: Purchase', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PurchaseService]
    });
  });

  it('should create an instance', () => {
    inject([PurchaseService], (purchaseService) => {
    let component = new PurchaseComponent(purchaseService);
    expect(component).toBeTruthy();
  });

  });
});
