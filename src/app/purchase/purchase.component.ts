import { Component, OnInit } from '@angular/core';
import { Purchase } from './purchase';
import { PurchaseService } from './purchase.service';
import { AdvertisementService } from '../advertisement/advertisement.service';
import { Advertisement } from '../advertisement/advertisement';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileService } from '../profile/profile.service';
import UsersCache from '../profile/usersCache';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
  providers: [AdvertisementService, PurchaseService, ProfileService],
})
export class PurchaseComponent implements OnInit {
  errorMessage: string;
  loading = true;

  hasPurchased = false;
  isPurchasing = false;
  advertisements: Advertisement[] = [];
  purchase: Purchase; // It will exist either if the product was already
                      // purchased, or the user has just completed the purchase.

  users = UsersCache.entries();

  constructor(private route: ActivatedRoute,
               private advertisementService: AdvertisementService,
               private purchaseService: PurchaseService,
               private profileService: ProfileService) {}

  ngOnInit() {
    this.route.params
      .map(params => params['ids'])
      .subscribe((advertisementIds) => {
        advertisementIds.split(',').forEach((advertisementId) => {
          const advertisementUri = `/advertisements/${advertisementId}`;
          this.loadAdvertisement(advertisementUri);
        });
      });
  }

  loadAdvertisement(uri: string) {
    this.advertisementService.getAdvertisement(uri).subscribe(
      advertisement => {
        this.advertisements.push(advertisement);

        this.loadPurchase(advertisement);
        this.profileService.getUser(`/users/${advertisement.owner}`).subscribe();
      },
      error => this.errorMessage = 'The advertisement does not exist.',
    );
  }

  loadPurchase(advertisement: Advertisement) {
    this.purchaseService.getPurchaseByAdvertisement(advertisement.uri).subscribe(
      error => { // Notice the inverted purchase <-> error order.
        this.purchase = error;
        this.errorMessage = `Product ${advertisement.title} has already been purchased.`;
        this.loading = false;
      },
      purchase => {
        // No purchase so far.
        this.loading = false;
      }
    );
  }

  submitPurchase() {
    this.isPurchasing = true;

    // Create the final purchase first, based on the ngInit advertisement.
    this.purchase = new Purchase({ advertisements: this.advertisements, });

    // Submit the purchase.
    this.purchaseService.addPurchase(this.purchase).subscribe(
      purchase => {
        // Successful purchase $$$!
        this.purchase = purchase;
        this.isPurchasing = false;
        this.hasPurchased = true;
      },
      error => {
        this.isPurchasing = false;
        this.errorMessage = error.message;
      }
    );
  }

  advertisementsTotal(): Number {
    return this.advertisements
      .map((advertisement) => advertisement.price)
      .reduce((p1, p2) => p1 + p2);
  }
}
