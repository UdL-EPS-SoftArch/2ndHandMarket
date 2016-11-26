import { Component, OnInit } from '@angular/core';
import { Purchase } from './purchase';
import { PurchaseService } from './purchase.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
  providers: [PurchaseService],
})
export class PurchaseComponent implements OnInit {
  hasPurchased: boolean = false;

  purchase: Purchase;

  constructor(private purchaseService: PurchaseService) {}

  ngOnInit() {}

  submitPurchase() {

  }
}
