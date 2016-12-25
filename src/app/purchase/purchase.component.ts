import { Component, OnInit } from '@angular/core';
import { Purchase } from './purchase';
import { PurchaseService } from './purchase.service';
import { AdvertisementService } from '../advertisement/advertisement.service';
import { Advertisement } from '../advertisement/advertisement';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
  providers: [AdvertisementService, PurchaseService],
})
export class PurchaseComponent implements OnInit {
  errorMessage: string;
  loading: boolean = true;

  hasPurchased: boolean = false;
  advertisements: Advertisement[];
  purchase: Purchase; // It will exist either if the product was already
                      // purchased, or the user has just completed the purchase.

  constructor(private route: ActivatedRoute,
               private advertisementService: AdvertisementService,
               private purchaseService: PurchaseService) {}

  ngOnInit() {
    this.route.params
      .map(params => params['id'])
      .subscribe((advertisementId) => {
        const advertisementUri = `/advertisements/${advertisementId}`;
        this.loadAdvertisement(advertisementUri);
      });
  }

  loadAdvertisement(uri: string) {
    this.advertisementService.getAdvertisement(uri).subscribe(
      advertisement => {
        this.advertisements = [advertisement];

        this.loadPurchase(advertisement.uri);
      },
      error => this.errorMessage = 'The advertisement does not exist.',
    );
  }

  loadPurchase(advertisementUri: string) {
    this.purchaseService.getPurchaseByAdvertisement(advertisementUri).subscribe(
      error => { // Notice the inverted purchase <-> error order.
        this.purchase = error;
        this.errorMessage = 'This product has already been purchased.';
        this.loading = false;
      },
      purchase => {
        // No purchase so far.
        this.loading = false;
      }
    );
  }

  submitPurchase() {
    // Create the final purchase first, based on the ngInit advertisement.
    this.purchase = new Purchase({ advertisements: this.advertisements, });

    // Submit the purchase.
    this.purchaseService.addPurchase(this.purchase).subscribe(
      purchase => {
        // Successful purchase $$$!
        this.purchase = purchase;
        this.hasPurchased = true;
      },
      error => this.errorMessage = error.message
    );
  }
}
